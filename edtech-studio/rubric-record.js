/* Password-encrypted, independently portable rubric records. */
window.AcademyRecords = (() => {
  const iterations=310000, dataType='academyforge.rubric.v1';
  const encode=bytes=>btoa(Array.from(new Uint8Array(bytes),v=>String.fromCharCode(v)).join(''));
  const decode=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
  async function key(passphrase, salt) {
    if (!window.crypto?.subtle) throw Error('Secure browser encryption is unavailable. Open the HTTPS workspace and retry.');
    if (passphrase.length<10) throw Error('Enter a passphrase of at least 10 characters and keep it for reopening the file.');
    const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(passphrase),'PBKDF2',false,['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  }
  async function encrypt(record,passphrase){
    const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12));
    const secret=await key(passphrase,salt);
    const bytes=await crypto.subtle.encrypt({name:'AES-GCM',iv},secret,new TextEncoder().encode(JSON.stringify(record)));
    return {format:dataType,cipher:'AES-256-GCM',kdf:'PBKDF2-SHA-256',iterations,salt:encode(salt),iv:encode(iv),ciphertext:encode(bytes)};
  }
  async function decrypt(envelope,passphrase){
    if(envelope?.format!==dataType||envelope.iterations!==iterations||envelope.cipher!=='AES-256-GCM'||envelope.kdf!=='PBKDF2-SHA-256') throw Error('Choose an AcademyForge encrypted rubric file.');
    const salt=decode(envelope.salt),iv=decode(envelope.iv);
    if(salt.length!==16||iv.length!==12)throw Error('Invalid encryption parameters.');
    const secret=await key(passphrase,salt);
    try{const bytes=await crypto.subtle.decrypt({name:'AES-GCM',iv},secret,decode(envelope.ciphertext));return JSON.parse(new TextDecoder().decode(bytes));}
    catch{throw Error('Unable to open this file. Check its passphrase and integrity.');}
  }
  return {encrypt,decrypt};
})();
