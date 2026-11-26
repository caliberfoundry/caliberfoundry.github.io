(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Deterministic synchronous SHA-256 implementation (FIPS 180-4) for browser audit receipts
  function sha256Hex(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = sha256Hex.h = sha256Hex.h || [];
    var k = sha256Hex.k = sha256Hex.k || [];
    var primeCounter = k[lengthProperty];
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;
    for (j = 0; j < words[lengthProperty]; ) {
      var w = words.slice(j, (j += 16));
      var oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var i2 = i + j;
        var w15 = w[i - 15], w2 = w[i - 2];
        var a = hash[0], e = hash[4];
        var temp1 =
          hash[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i]
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0);
        var temp2 =
          (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
          ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }
    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        var b = (hash[i] >> (j * 8)) & 255;
        result += (b < 16 ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }

  var BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  function hexToBase58(hexStr) {
    var bytes = [];
    for (var c = 0; c < hexStr.length; c += 2) {
      bytes.push(parseInt(hexStr.substr(c, 2), 16));
    }
    var digits = [0];
    for (var i = 0; i < bytes.length; i++) {
      var carry = bytes[i];
      for (var j = 0; j < digits.length; j++) {
        carry += digits[j] << 8;
        digits[j] = carry % 58;
        carry = (carry / 58) | 0;
      }
      while (carry > 0) {
        digits.push(carry % 58);
        carry = (carry / 58) | 0;
      }
    }
    var out = '';
    for (var k = digits.length - 1; k >= 0; k--) {
      out += BASE58_ALPHABET[digits[k]];
    }
    return out;
  }

  var AUTHORITY_PUBKEY = 'StvCapAuthoR1tyPubkey1111111111111111111111';
  var POOL_ID = 'steve-capital-arena-vault-01';
  var COMPUTE_BUDGET_PROGRAM_ID = 'ComputeBudget111111111111111111111111111111';
  var MULTIHOPPER_PROGRAM_ID = 'MHopperRout1ngSett1ementProgram111111111111';

  function deriveVaultPda(role) {
    var digest = sha256Hex(JSON.stringify([
      'oobe_steve_vault_v1',
      'ooBEStvCap1taLAgentVau1tProgram111111111111',
      AUTHORITY_PUBKEY,
      POOL_ID,
      role
    ]));
    return 'oobeVault' + hexToBase58(digest).slice(0, 35);
  }

  function createBaseVenues() {
    return [
      {
        id: 'kamino',
        name: 'Kamino Main Market USDC',
        programId: 'KLend2g3cP87fffoy8q1mQqGKjrxjC8boSyAYavgmjD',
        strategyLabel: 'Senior USDC Lending Vault',
        grossApyBps: 1180,
        rewardApyBps: 140,
        dailyVolatilityBps: 24,
        downsideDeviationBps: 15,
        tvlUsd: 425000000,
        availableLiquidityUsd: 88000000,
        utilizationRateBps: 7920,
        slippageBpsPer10kUsd: 2,
        oracleAgeSeconds: 8,
        oracleConfidenceBps: 6,
        protocolRiskScore: 95,
        enabled: true
      },
      {
        id: 'drift',
        name: 'Drift Delta-Neutral Vault',
        programId: 'dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH',
        strategyLabel: 'Basis & Funding Arbitrage',
        grossApyBps: 1420,
        rewardApyBps: 190,
        dailyVolatilityBps: 48,
        downsideDeviationBps: 31,
        tvlUsd: 195000000,
        availableLiquidityUsd: 42000000,
        utilizationRateBps: 8150,
        slippageBpsPer10kUsd: 4,
        oracleAgeSeconds: 9,
        oracleConfidenceBps: 11,
        protocolRiskScore: 91,
        enabled: true
      },
      {
        id: 'jupiter-jlp',
        name: 'Jupiter Perps JLP (Hedged)',
        programId: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4',
        strategyLabel: 'Delta-Hedged JLP Fee Capture',
        grossApyBps: 1840,
        rewardApyBps: 0,
        dailyVolatilityBps: 82,
        downsideDeviationBps: 54,
        tvlUsd: 680000000,
        availableLiquidityUsd: 145000000,
        utilizationRateBps: 7850,
        slippageBpsPer10kUsd: 5,
        oracleAgeSeconds: 6,
        oracleConfidenceBps: 9,
        protocolRiskScore: 89,
        enabled: true
      },
      {
        id: 'meteora-dlmm',
        name: 'Meteora Dynamic DLMM Bin',
        programId: 'LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo',
        strategyLabel: 'Concentrated Dynamic Fee Provision',
        grossApyBps: 1550,
        rewardApyBps: 120,
        dailyVolatilityBps: 60,
        downsideDeviationBps: 41,
        tvlUsd: 140000000,
        availableLiquidityUsd: 34000000,
        utilizationRateBps: 7600,
        slippageBpsPer10kUsd: 4,
        oracleAgeSeconds: 11,
        oracleConfidenceBps: 12,
        protocolRiskScore: 87,
        enabled: true
      },
      {
        id: 'marginfi',
        name: 'Marginfi Institutional USDC',
        programId: 'MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA',
        strategyLabel: 'Overcollateralized Money Market',
        grossApyBps: 1020,
        rewardApyBps: 110,
        dailyVolatilityBps: 28,
        downsideDeviationBps: 18,
        tvlUsd: 260000000,
        availableLiquidityUsd: 58000000,
        utilizationRateBps: 7740,
        slippageBpsPer10kUsd: 2,
        oracleAgeSeconds: 10,
        oracleConfidenceBps: 7,
        protocolRiskScore: 88,
        enabled: true
      }
    ];
  }

  // Deterministic Risk-Adjusted Water-Filling Allocator
  function computeOptimalAllocations(pool, venues, policy, sentimentMap) {
    var investableWeightBps = Math.max(0, Math.min(10000, 10000 - policy.minReserveBufferBps));
    var sqrt365 = Math.sqrt(365);

    var scored = venues.map(function (v) {
      var eligible =
        v.enabled &&
        v.utilizationRateBps <= policy.maxProtocolUtilizationBps &&
        v.oracleAgeSeconds <= policy.maxOracleStalenessSeconds &&
        v.oracleConfidenceBps <= policy.maxOracleConfidenceBps &&
        v.availableLiquidityUsd > 0;

      var convBps = Math.max(-1500, Math.min(1500, (sentimentMap && sentimentMap[v.id]) || 0));
      var baseApy = v.grossApyBps + v.rewardApyBps;
      var effApy = baseApy * (1 + convBps / 10000);
      var annualVol = v.dailyVolatilityBps * sqrt365;
      var annualDown = Math.max(50, v.downsideDeviationBps * sqrt365);
      var excess = Math.max(0, effApy - policy.riskFreeRateBps);

      var rawSharpe = excess / Math.max(50, annualVol);
      var rawSortino = excess / annualDown;
      var liqFactor = Math.min(1.25, Math.log10(Math.max(10000, v.availableLiquidityUsd)) / 6);
      var safetyFactor = Math.pow(Math.max(1, Math.min(100, v.protocolRiskScore)) / 100, 1.2);

      var score = eligible && excess > 0
        ? (0.45 * rawSortino + 0.35 * rawSharpe) * liqFactor * safetyFactor
        : 0;

      var liqCapBps = pool.totalEquityUsd > 0
        ? Math.floor(((v.availableLiquidityUsd * 0.25) / pool.totalEquityUsd) * 10000)
        : policy.maxSingleVenueWeightBps;

      var maxCapBps = eligible ? Math.max(0, Math.min(policy.maxSingleVenueWeightBps, liqCapBps)) : 0;

      return {
        venue: v,
        eligible: eligible,
        sharpeRatio: Number(rawSharpe.toFixed(2)),
        sortinoRatio: Number(rawSortino.toFixed(2)),
        riskAdjustedScore: Number(score.toFixed(4)),
        maxCapBps: maxCapBps,
        convBps: convBps
      };
    });

    var assigned = {};
    var capped = {};
    scored.forEach(function (sv) {
      assigned[sv.venue.id] = 0;
      capped[sv.venue.id] = false;
    });

    var remaining = investableWeightBps;
    var active = scored.filter(function (sv) {
      return sv.eligible && sv.riskAdjustedScore > 0 && sv.maxCapBps > 0;
    });

    while (active.length > 0 && remaining > 0) {
      var totalScore = active.reduce(function (s, sv) { return s + sv.riskAdjustedScore; }, 0);
      if (totalScore <= 0) break;

      var anyCapped = false;
      for (var i = 0; i < active.length; i++) {
        var sv = active[i];
        var prov = (sv.riskAdjustedScore / totalScore) * remaining;
        if (prov > sv.maxCapBps) {
          assigned[sv.venue.id] = sv.maxCapBps;
          capped[sv.venue.id] = true;
          remaining = Math.max(0, remaining - sv.maxCapBps);
          anyCapped = true;
        }
      }

      if (anyCapped) {
        active = active.filter(function (sv) { return !capped[sv.venue.id]; });
        continue;
      }

      var sumFloored = 0;
      var rems = [];
      active.forEach(function (sv) {
        var exact = (sv.riskAdjustedScore / totalScore) * remaining;
        var fl = Math.min(sv.maxCapBps, Math.floor(exact));
        assigned[sv.venue.id] = fl;
        if (fl === sv.maxCapBps) capped[sv.venue.id] = true;
        sumFloored += fl;
        rems.push({ id: sv.venue.id, frac: exact - fl, maxCap: sv.maxCapBps });
      });

      var left = remaining - sumFloored;
      rems.sort(function (a, b) { return b.frac - a.frac; });
      for (var r = 0; r < rems.length && left > 0; r++) {
        var item = rems[r];
        if (assigned[item.id] < item.maxCap) {
          assigned[item.id] += 1;
          left -= 1;
        }
      }
      break;
    }

    return scored.map(function (sv) {
      var id = sv.venue.id;
      var tw = assigned[id] || 0;
      var tUsd = Number(((pool.totalEquityUsd * tw) / 10000).toFixed(2));
      var cUsd = Number((pool.currentAllocationsUsd[id] || 0).toFixed(2));
      var cw = pool.totalEquityUsd > 0 ? Math.round((cUsd / pool.totalEquityUsd) * 10000) : 0;
      return {
        venueId: id,
        targetWeightBps: tw,
        targetAmountUsd: tUsd,
        currentWeightBps: cw,
        currentAmountUsd: cUsd,
        deltaAmountUsd: Number((tUsd - cUsd).toFixed(2)),
        deltaWeightBps: tw - cw,
        sharpeRatio: sv.sharpeRatio,
        sortinoRatio: sv.sortinoRatio,
        riskAdjustedScore: sv.riskAdjustedScore,
        cappedByConcentration: Boolean(capped[id]),
        convictionBps: sv.convBps
      };
    });
  }

  function evaluateRiskGuardrails(pool, venues, policy, targets, priorityFeeLamports) {
    var violations = [];
    var drawdownBps = pool.peakEquityUsd > 0
      ? Math.max(0, Math.round(((pool.peakEquityUsd - pool.totalEquityUsd) / pool.peakEquityUsd) * 10000))
      : 0;

    if (drawdownBps >= policy.emergencyUnwindDrawdownBps) {
      violations.push({
        code: 'EMERGENCY_UNWIND_TRIGGER',
        severity: 'CRITICAL_UNWIND',
        measuredValue: drawdownBps,
        limitValue: policy.emergencyUnwindDrawdownBps,
        message: 'Pool drawdown (' + drawdownBps + ' bps) breached 600 bps emergency circuit breaker.'
      });
    } else if (drawdownBps >= policy.maxDrawdownCircuitBreakerBps) {
      violations.push({
        code: 'MAX_DRAWDOWN_BREACH',
        severity: 'BLOCK',
        measuredValue: drawdownBps,
        limitValue: policy.maxDrawdownCircuitBreakerBps,
        message: 'Pool drawdown (' + drawdownBps + ' bps) exceeded 450 bps drawdown circuit breaker.'
      });
    }

    var dailyVolBps = 0;
    var totalTargetW = 0;
    targets.forEach(function (t) {
      var v = venues.find(function (x) { return x.id === t.venueId; });
      if (v) {
        dailyVolBps += (t.targetWeightBps / 10000) * v.dailyVolatilityBps;
        totalTargetW += t.targetWeightBps;
      }
    });

    var var95Bps = Math.round(dailyVolBps * 1.645);
    var regime = dailyVolBps < 45 ? 'LOW' : dailyVolBps <= 95 ? 'NORMAL' : dailyVolBps <= 150 ? 'ELEVATED' : 'EXTREME';

    if (var95Bps > policy.maxDailyVaR95Bps) {
      violations.push({
        code: 'VAR_LIMIT_EXCEEDED',
        severity: 'BLOCK',
        measuredValue: var95Bps,
        limitValue: policy.maxDailyVaR95Bps,
        message: '95% Daily Parametric VaR (' + var95Bps + ' bps) exceeds mandate limit.'
      });
    }

    venues.forEach(function (v) {
      if (v.oracleAgeSeconds > policy.maxOracleStalenessSeconds) {
        violations.push({
          code: 'ORACLE_STALE',
          severity: 'BLOCK',
          venueId: v.id,
          measuredValue: v.oracleAgeSeconds,
          limitValue: policy.maxOracleStalenessSeconds,
          message: 'Pyth oracle stale on ' + v.name + ' (' + v.oracleAgeSeconds + 's > ' + policy.maxOracleStalenessSeconds + 's).'
        });
      }
      if (v.oracleConfidenceBps > policy.maxOracleConfidenceBps) {
        violations.push({
          code: 'ORACLE_CONFIDENCE_WIDE',
          severity: 'BLOCK',
          venueId: v.id,
          measuredValue: v.oracleConfidenceBps,
          limitValue: policy.maxOracleConfidenceBps,
          message: 'Pyth confidence spread wide on ' + v.name + ' (' + v.oracleConfidenceBps + ' bps).'
        });
      }
    });

    if (priorityFeeLamports > policy.maxPriorityFeeLamports) {
      violations.push({
        code: 'PRIORITY_FEE_CEILING_EXCEEDED',
        severity: 'BLOCK',
        measuredValue: priorityFeeLamports,
        limitValue: policy.maxPriorityFeeLamports,
        message: 'Solana priority fee (' + priorityFeeLamports.toLocaleString() + ' lamports) exceeds 250,000 ceiling.'
      });
    }

    var reserveBps = 10000 - totalTargetW;
    if (reserveBps < policy.minReserveBufferBps) {
      violations.push({
        code: 'RESERVE_BUFFER_BREACH',
        severity: 'BLOCK',
        measuredValue: reserveBps,
        limitValue: policy.minReserveBufferBps,
        message: 'Projected liquid reserve below minimum buffer.'
      });
    }

    var unwind = violations.some(function (v) { return v.severity === 'CRITICAL_UNWIND'; });
    var blocked = violations.some(function (v) { return v.severity === 'BLOCK'; });

    return {
      approved: !unwind && !blocked,
      emergencyUnwindRequired: unwind,
      volatilityRegime: regime,
      currentDrawdownBps: drawdownBps,
      portfolioDailyVaR95Bps: var95Bps,
      violations: violations
    };
  }

  function buildRebalanceProposal(pool, venues, policy, targets, riskResult, priorityFeeLamports) {
    var solPriceUsd = 185.0;
    var solanaNetworkFeeUsd = Number((((5000 + priorityFeeLamports) / 1e9) * solPriceUsd).toFixed(4));

    var currentApyBps = Number(targets.reduce(function (s, t) {
      var v = venues.find(function (x) { return x.id === t.venueId; });
      return s + (t.currentWeightBps / 10000) * (v ? v.grossApyBps + v.rewardApyBps : 0);
    }, 0).toFixed(2));

    var proposedApyBps = Number(targets.reduce(function (s, t) {
      var v = venues.find(function (x) { return x.id === t.venueId; });
      return s + (t.targetWeightBps / 10000) * (v ? v.grossApyBps + v.rewardApyBps : 0);
    }, 0).toFixed(2));

    if (riskResult.emergencyUnwindRequired) {
      var unwindLegs = targets.map(function (t) {
        var v = venues.find(function (x) { return x.id === t.venueId; });
        if (t.currentAmountUsd <= 0.01) {
          return { venueId: t.venueId, action: 'HOLD', deltaUsd: 0, estimatedSlippageBps: 0, estimatedSlippageUsd: 0, routeViaMultiHopper: false };
        }
        var d = -t.currentAmountUsd;
        var sbps = v ? Math.max(1, Math.ceil((Math.abs(d) / 10000) * v.slippageBpsPer10kUsd)) : 4;
        var susd = Number((Math.abs(d) * (sbps / 10000)).toFixed(4));
        return { venueId: t.venueId, action: 'WITHDRAW', deltaUsd: d, estimatedSlippageBps: sbps, estimatedSlippageUsd: susd, routeViaMultiHopper: true };
      });
      var uTurn = Number(unwindLegs.reduce(function (s, l) { return s + Math.abs(l.deltaUsd); }, 0).toFixed(2));
      var uSlip = Number(unwindLegs.reduce(function (s, l) { return s + l.estimatedSlippageUsd; }, 0).toFixed(4));
      var uCost = Number((uSlip + solanaNetworkFeeUsd).toFixed(4));
      return {
        shouldExecute: uTurn > 0,
        rejectionCode: 'EMERGENCY_UNWIND_ACTIVE',
        reason: 'Emergency drawdown circuit breaker triggered: unwinding 100% of deployed positions back to OOBE Vault PDA.',
        currentWeightedApyBps: currentApyBps,
        proposedWeightedApyBps: 0,
        netApyImprovementBps: Number((-currentApyBps).toFixed(2)),
        hourlyYieldGainUsd: 0,
        totalTurnoverUsd: uTurn,
        totalSlippageCostUsd: uSlip,
        solanaNetworkFeeUsd: solanaNetworkFeeUsd,
        totalExecutionCostUsd: uCost,
        paybackHorizonHours: 0,
        legs: unwindLegs,
        reserveTargetUsd: pool.totalEquityUsd
      };
    }

    var activeTargets = targets.filter(function (t) {
      return Math.abs(t.deltaWeightBps) >= policy.minRebalanceDeltaBps && Math.abs(t.deltaAmountUsd) >= 0.01;
    });

    var routeMulti = activeTargets.length >= 2;
    var activeIds = {};
    activeTargets.forEach(function (t) { activeIds[t.venueId] = true; });

    var legs = targets.map(function (t) {
      if (!activeIds[t.venueId]) {
        return { venueId: t.venueId, action: 'HOLD', deltaUsd: 0, estimatedSlippageBps: 0, estimatedSlippageUsd: 0, routeViaMultiHopper: false };
      }
      var v = venues.find(function (x) { return x.id === t.venueId; });
      var act = t.deltaAmountUsd > 0 ? 'DEPOSIT' : 'WITHDRAW';
      var sbps = v ? Math.max(1, Math.ceil((Math.abs(t.deltaAmountUsd) / 10000) * v.slippageBpsPer10kUsd)) : 4;
      var susd = Number((Math.abs(t.deltaAmountUsd) * (sbps / 10000)).toFixed(4));
      return {
        venueId: t.venueId,
        action: act,
        deltaUsd: t.deltaAmountUsd,
        estimatedSlippageBps: sbps,
        estimatedSlippageUsd: susd,
        routeViaMultiHopper: routeMulti
      };
    });

    var turnover = Number(legs.reduce(function (s, l) { return s + Math.abs(l.deltaUsd); }, 0).toFixed(2));
    var slipUsd = Number(legs.reduce(function (s, l) { return s + l.estimatedSlippageUsd; }, 0).toFixed(4));
    var totalCost = turnover > 0 ? Number((slipUsd + solanaNetworkFeeUsd).toFixed(4)) : 0;

    var netApyGain = Number((proposedApyBps - currentApyBps).toFixed(2));
    var annualGainUsd = pool.totalEquityUsd * (netApyGain / 10000);
    var hourlyGainUsd = Number((annualGainUsd / 8760).toFixed(4));
    var paybackHours = hourlyGainUsd > 0 ? Number((totalCost / hourlyGainUsd).toFixed(1)) : 999999;
    var reserveTarget = Number(Math.max(0, pool.totalEquityUsd - targets.reduce(function (s, t) { return s + t.targetAmountUsd; }, 0)).toFixed(2));

    if (!riskResult.approved) {
      var v0 = riskResult.violations[0];
      return {
        shouldExecute: false,
        rejectionCode: 'RISK_BLOCKED',
        reason: 'Blocked by OOBE risk guardrails: ' + (v0 ? v0.code + ' — ' + v0.message : 'Policy violation'),
        currentWeightedApyBps: currentApyBps,
        proposedWeightedApyBps: proposedApyBps,
        netApyImprovementBps: netApyGain,
        hourlyYieldGainUsd: hourlyGainUsd,
        totalTurnoverUsd: turnover,
        totalSlippageCostUsd: slipUsd,
        solanaNetworkFeeUsd: solanaNetworkFeeUsd,
        totalExecutionCostUsd: totalCost,
        paybackHorizonHours: paybackHours,
        legs: legs,
        reserveTargetUsd: reserveTarget
      };
    }

    if (activeTargets.length === 0 || turnover < 0.01) {
      return {
        shouldExecute: false,
        rejectionCode: 'NO_DRIFT',
        reason: 'All venue weight deltas within anti-churn drift band (< ' + policy.minRebalanceDeltaBps + ' bps). Holding current positions.',
        currentWeightedApyBps: currentApyBps,
        proposedWeightedApyBps: proposedApyBps,
        netApyImprovementBps: netApyGain,
        hourlyYieldGainUsd: hourlyGainUsd,
        totalTurnoverUsd: 0,
        totalSlippageCostUsd: 0,
        solanaNetworkFeeUsd: solanaNetworkFeeUsd,
        totalExecutionCostUsd: 0,
        paybackHorizonHours: 0,
        legs: legs,
        reserveTargetUsd: reserveTarget
      };
    }

    if (netApyGain <= 0) {
      return {
        shouldExecute: false,
        rejectionCode: 'NEGATIVE_YIELD_GAIN',
        reason: 'Anti-churn guard rejected rebalance: net APY change (' + netApyGain + ' bps) is non-positive.',
        currentWeightedApyBps: currentApyBps,
        proposedWeightedApyBps: proposedApyBps,
        netApyImprovementBps: netApyGain,
        hourlyYieldGainUsd: hourlyGainUsd,
        totalTurnoverUsd: turnover,
        totalSlippageCostUsd: slipUsd,
        solanaNetworkFeeUsd: solanaNetworkFeeUsd,
        totalExecutionCostUsd: totalCost,
        paybackHorizonHours: paybackHours,
        legs: legs,
        reserveTargetUsd: reserveTarget
      };
    }

    if (paybackHours > policy.maxPaybackHorizonHours) {
      return {
        shouldExecute: false,
        rejectionCode: 'PAYBACK_HORIZON_EXCEEDED',
        reason: 'Anti-churn guard suppressed trade: break-even horizon (' + paybackHours + 'h) exceeds mandate ceiling (' + policy.maxPaybackHorizonHours + 'h).',
        currentWeightedApyBps: currentApyBps,
        proposedWeightedApyBps: proposedApyBps,
        netApyImprovementBps: netApyGain,
        hourlyYieldGainUsd: hourlyGainUsd,
        totalTurnoverUsd: turnover,
        totalSlippageCostUsd: slipUsd,
        solanaNetworkFeeUsd: solanaNetworkFeeUsd,
        totalExecutionCostUsd: totalCost,
        paybackHorizonHours: paybackHours,
        legs: legs,
        reserveTargetUsd: reserveTarget
      };
    }

    return {
      shouldExecute: true,
      reason: 'Positive-EV rebalance approved: +' + netApyGain + ' bps net APY gain with ' + paybackHours + 'h break-even horizon (<= ' + policy.maxPaybackHorizonHours + 'h ceiling).',
      currentWeightedApyBps: currentApyBps,
      proposedWeightedApyBps: proposedApyBps,
      netApyImprovementBps: netApyGain,
      hourlyYieldGainUsd: hourlyGainUsd,
      totalTurnoverUsd: turnover,
      totalSlippageCostUsd: slipUsd,
      solanaNetworkFeeUsd: solanaNetworkFeeUsd,
      totalExecutionCostUsd: totalCost,
      paybackHorizonHours: paybackHours,
      legs: legs,
      reserveTargetUsd: reserveTarget
    };
  }

  function buildReceipt(pool, venues, policy, targets, riskResult, proposal, priorityFeeLamports, sentimentMap) {
    var vaultPda = deriveVaultPda('primary_treasury');
    var subVaultPda = deriveVaultPda('yield_optimizer_subagent');

    var decisionInput = {
      priorityFeeLamports: priorityFeeLamports,
      policy: policy,
      poolId: POOL_ID,
      epoch: pool.epochNumber,
      equity: pool.totalEquityUsd,
      targets: targets.map(function (t) { return [t.venueId, t.targetWeightBps]; }),
      riskApproved: riskResult.approved,
      unwind: riskResult.emergencyUnwindRequired,
      execute: proposal.shouldExecute,
      turnover: proposal.totalTurnoverUsd
    };
    var decisionHash = sha256Hex(JSON.stringify(decisionInput));

    var aceHash = sha256Hex(JSON.stringify({
      source: 'built-in scenario assumptions',
      epoch: pool.epochNumber,
      sentiment: sentimentMap,
      scores: targets.map(function (t) { return [t.venueId, t.riskAdjustedScore]; })
    }));

    var actionType = riskResult.emergencyUnwindRequired
      ? 'EMERGENCY_UNWIND'
      : proposal.shouldExecute
      ? 'REBALANCE'
      : 'HOLD';

    var instructions = [];
    if (proposal.shouldExecute) {
      instructions.push({
        programId: COMPUTE_BUDGET_PROGRAM_ID,
        instructionName: 'compute_budget_limit',
        estimatedComputeUnits: 150,
        dataHex: sha256Hex('limit:260000').slice(0, 32)
      });
      instructions.push({
        programId: COMPUTE_BUDGET_PROGRAM_ID,
        instructionName: 'compute_budget_price',
        estimatedComputeUnits: 150,
        dataHex: sha256Hex('price:' + priorityFeeLamports).slice(0, 32)
      });

      proposal.legs.filter(function (l) { return l.action === 'WITHDRAW'; }).forEach(function (leg) {
        var v = venues.find(function (x) { return x.id === leg.venueId; });
        var ixName = riskResult.emergencyUnwindRequired ? 'oobe_emergency_unwind' : 'oobe_withdraw';
        instructions.push({
          programId: v ? v.programId : COMPUTE_BUDGET_PROGRAM_ID,
          instructionName: ixName,
          venueId: leg.venueId,
          amountUsd: Math.abs(leg.deltaUsd),
          estimatedComputeUnits: 48000,
          dataHex: sha256Hex(ixName + ':' + leg.venueId + ':' + leg.deltaUsd).slice(0, 32)
        });
      });

      var mhLegs = proposal.legs.filter(function (l) { return l.action !== 'HOLD' && l.routeViaMultiHopper; });
      if (mhLegs.length > 0) {
        instructions.push({
          programId: MULTIHOPPER_PROGRAM_ID,
          instructionName: 'multihopper_route_settle',
          amountUsd: proposal.totalTurnoverUsd,
          estimatedComputeUnits: 36000,
          dataHex: sha256Hex('multihopper:' + proposal.totalTurnoverUsd).slice(0, 32)
        });
      }

      proposal.legs.filter(function (l) { return l.action === 'DEPOSIT'; }).forEach(function (leg) {
        var v = venues.find(function (x) { return x.id === leg.venueId; });
        instructions.push({
          programId: v ? v.programId : COMPUTE_BUDGET_PROGRAM_ID,
          instructionName: 'oobe_allocate',
          venueId: leg.venueId,
          amountUsd: leg.deltaUsd,
          estimatedComputeUnits: 52000,
          dataHex: sha256Hex('allocate:' + leg.venueId + ':' + leg.deltaUsd).slice(0, 32)
        });
      });
    }

    var totalCu = instructions.reduce(function (s, ix) { return s + ix.estimatedComputeUnits; }, 0);
    var hasMh = instructions.some(function (ix) { return ix.instructionName === 'multihopper_route_settle'; });
    var mhRouteId = hasMh ? 'mhopper-route-ep' + pool.epochNumber + '-' + decisionHash.slice(0, 10) : undefined;
    var simSig = hexToBase58(sha256Hex('sig:' + decisionHash) + sha256Hex('sig2:' + decisionHash)).slice(0, 88);

    return {
      receiptId: 'oobe-rcpt-ep' + pool.epochNumber + '-' + decisionHash.slice(0, 12),
      agentId: 'oobe-sentinel-capital-agent-01',
      mandateId: policy.mandateId,
      vaultPda: vaultPda,
      subAgentVaultPda: subVaultPda,
      actionType: actionType,
      executed: proposal.shouldExecute,
      decisionHashSha256: decisionHash,
      decisionInput: decisionInput,
      simulatedSignature: simSig,
      multiHopperRouteId: mhRouteId,
      aceResearchBriefHash: aceHash,
      totalComputeUnits: totalCu,
      priorityFeeLamports: priorityFeeLamports,
      netCostUsd: proposal.shouldExecute ? proposal.totalExecutionCostUsd : 0,
      instructions: instructions
    };
  }

  function defaultPeriodInputs() {
    return [35000, 45000, 40000, 420000, 65000].map(function (fee, idx) {
      return { priorityFeeLamports: fee, drawdownBps: idx === 4 ? 640 : 0 };
    });
  }

  // Application State
  var state = {
    activeScenarioIdx: 0,
    periodInputs: defaultPeriodInputs(),
    backtestSteps: [],
    selectedStepIdx: 0
  };

  var candleSource=null, importGeneration=0;
  var candleFile=document.getElementById('candleFile');
  var candleStatus=document.getElementById('candleStatus');
  function resetHistory() {
    candleSource=null;
    document.getElementById('drawdownSlider').max=800;
    document.getElementById('drawdownSlider').step=20;
  }
  function describeHistory() {
    if(!candleSource) return;
    const overrides=state.periodInputs.filter(p=>p.drawdownSource==='manual').length;
    candleStatus.textContent=candleSource.file+' · '+candleSource.periods[1].startUtc.slice(0,16)+' to '+
      candleSource.periods[4].endUtc.slice(0,16)+' UTC · Declines for periods 2–5: '+
      candleSource.periods.slice(1).map(p=>(p.drawdownBps/100).toFixed(2)+'%').join(', ')+
      (overrides?' · '+overrides+' period(s) manually overridden.':'.');
  }
  async function importCandles() {
    const generation=++importGeneration, file=candleFile.files[0];
    if(!file)return;
    const button=document.getElementById('downloadAuditBtn');
    button.disabled=true;
    candleStatus.textContent='Reading historical prices…';
    try {
      const source=await window.OobeCandles.read(file);
      if(generation!==importGeneration)return;
      candleSource=source;
      state.periodInputs.forEach((p,i)=>{
        p.drawdownBps=source.periods[i].drawdownBps;
        p.drawdownSource=i?'historical decline':'initial allocation';
      });
      const slider=document.getElementById('drawdownSlider');
      slider.max=Math.max(800,...source.periods.map(p=>p.drawdownBps));slider.step=1;
      runFull5EpochSimulation();selectPeriod(state.activeScenarioIdx);describeHistory();
    } catch(error) {
      if(generation!==importGeneration)return;
      describeHistory();
      candleStatus.textContent='Import failed. '+error.message+' Current inputs: '+(candleSource?candleStatus.textContent:'existing scenario sliders.');
    } finally {
      if(generation===importGeneration){button.disabled=false;candleFile.value='';}
    }
  }
  candleFile.addEventListener('change',importCandles);
  candleFile.disabled=false;
  if(candleFile.files.length)importCandles();

  function getPolicyFromSliders() {
    var maxCapPct = Number(document.getElementById('maxCapSlider').value);
    var reservePct = Number(document.getElementById('reserveSlider').value);
    var paybackHrs = Number(document.getElementById('paybackSlider').value);
    return {
      mandateId: 'oobe-steve-mandate-institutional-v1',
      minReserveBufferBps: Math.round(reservePct * 100),
      maxSingleVenueWeightBps: Math.round(maxCapPct * 100),
      maxProtocolUtilizationBps: 9200,
      maxDrawdownCircuitBreakerBps: 450,
      emergencyUnwindDrawdownBps: 600,
      maxDailyVaR95Bps: 180,
      maxOracleStalenessSeconds: 45,
      maxOracleConfidenceBps: 50,
      maxExecutionSlippageBps: 35,
      maxPriorityFeeLamports: 250000,
      maxComputeUnits: 400000,
      minRebalanceDeltaBps: 150,
      maxPaybackHorizonHours: paybackHrs,
      riskFreeRateBps: 425
    };
  }

  function runFull5EpochSimulation() {
    var initialCapital = Number(document.getElementById('capitalSlider').value);
    var policy = getPolicyFromSliders();
    var pool = {
      poolId: POOL_ID,
      totalEquityUsd: initialCapital,
      peakEquityUsd: initialCapital,
      liquidReserveUsd: initialCapital,
      currentAllocationsUsd: { kamino: 0, drift: 0, 'jupiter-jlp': 0, 'meteora-dlmm': 0, marginfi: 0 },
      currentWeightsBps: { kamino: 0, drift: 0, 'jupiter-jlp': 0, 'meteora-dlmm': 0, marginfi: 0 },
      epochNumber: 1
    };

    var venues = createBaseVenues();
    var sentiment = { kamino: 250, drift: 400, 'jupiter-jlp': 150, 'meteora-dlmm': 100, marginfi: 0 };

    var scenarios = [
      {
        label: '01_NORMAL_GENESIS_DEPLOYMENT',
        elapsedHours: 0,
      },
      {
        label: '02_ANTI_CHURN_HOLD_REGIME',
        elapsedHours: 24,
        patch: function (vs) {
          var jlp = vs.find(function (x) { return x.id === 'jupiter-jlp'; });
          if (jlp) {
            jlp.grossApyBps = 1852;
            jlp.dailyVolatilityBps = 66;
            jlp.downsideDeviationBps = 43;
            jlp.slippageBpsPer10kUsd = 18;
          }
        }
      },
      {
        label: '03_MULTIHOPPER_YIELD_ROTATION',
        elapsedHours: 24,
        patch: function (vs, sent) {
          var jlp = vs.find(function (x) { return x.id === 'jupiter-jlp'; });
          var drift = vs.find(function (x) { return x.id === 'drift'; });
          var met = vs.find(function (x) { return x.id === 'meteora-dlmm'; });
          var mfi = vs.find(function (x) { return x.id === 'marginfi'; });
          if (jlp) jlp.slippageBpsPer10kUsd = 3;
          if (drift) { drift.grossApyBps = 3380; drift.rewardApyBps = 540; drift.downsideDeviationBps = 24; drift.slippageBpsPer10kUsd = 2; }
          if (met) { met.grossApyBps = 3150; met.rewardApyBps = 450; met.downsideDeviationBps = 28; met.slippageBpsPer10kUsd = 2; }
          if (mfi) { mfi.grossApyBps = 940; mfi.downsideDeviationBps = 26; mfi.dailyVolatilityBps = 35; }
          sent.drift = 1200;
          sent['meteora-dlmm'] = 950;
          sent['jupiter-jlp'] = -300;
          sent.marginfi = -600;
        }
      },
      {
        label: '04_ORACLE_AND_GAS_GUARDRAIL_BLOCK',
        elapsedHours: 24,
        patch: function (vs) {
          var met = vs.find(function (x) { return x.id === 'meteora-dlmm'; });
          if (met) {
            met.oracleAgeSeconds = 92;
            met.oracleConfidenceBps = 74;
          }
        }
      },
      {
        label: '05_BLACK_SWAN_EMERGENCY_UNWIND',
        elapsedHours: 12,
        patch: function (vs) {
          var met = vs.find(function (x) { return x.id === 'meteora-dlmm'; });
          if (met) {
            met.oracleAgeSeconds = 9;
            met.oracleConfidenceBps = 10;
          }
        }
      }
    ];

    var results = [];

    scenarios.forEach(function (sc, idx) {
      var conditions = state.periodInputs[idx];
      sc.fee = conditions.priorityFeeLamports;
      sc.shockBps = -conditions.drawdownBps;
      // Accrue yield
      if (sc.elapsedHours > 0) {
        var sumDep = 0;
        venues.forEach(function (v) {
          var cur = pool.currentAllocationsUsd[v.id] || 0;
          if (cur > 0) {
            var acc = cur * ((v.grossApyBps + v.rewardApyBps) / 10000) * (sc.elapsedHours / 8760);
            pool.currentAllocationsUsd[v.id] = Number((cur + acc).toFixed(2));
          }
          sumDep += pool.currentAllocationsUsd[v.id] || 0;
        });
        pool.totalEquityUsd = Number((sumDep + pool.liquidReserveUsd).toFixed(2));
        if (pool.totalEquityUsd > pool.peakEquityUsd) pool.peakEquityUsd = pool.totalEquityUsd;
      }

      if (sc.patch) sc.patch(venues, sentiment);

      if (sc.shockBps && sc.shockBps !== 0) {
        var factor = Math.max(0, 1 + sc.shockBps / 10000);
        var shockedDep = 0;
        venues.forEach(function (v) {
          pool.currentAllocationsUsd[v.id] = Number(((pool.currentAllocationsUsd[v.id] || 0) * factor).toFixed(2));
          shockedDep += pool.currentAllocationsUsd[v.id];
        });
        pool.liquidReserveUsd = Number((pool.liquidReserveUsd * factor).toFixed(2));
        pool.totalEquityUsd = Number((shockedDep + pool.liquidReserveUsd).toFixed(2));
      }

      venues.forEach(function (v) {
        var amt = pool.currentAllocationsUsd[v.id] || 0;
        pool.currentWeightsBps[v.id] = pool.totalEquityUsd > 0 ? Math.round((amt / pool.totalEquityUsd) * 10000) : 0;
      });

      var targets = computeOptimalAllocations(pool, venues, policy, sentiment);
      var riskResult = evaluateRiskGuardrails(pool, venues, policy, targets, sc.fee);
      var proposal = buildRebalanceProposal(pool, venues, policy, targets, riskResult, sc.fee);
      var receipt = buildReceipt(pool, venues, policy, targets, riskResult, proposal, sc.fee, sentiment);

      if (proposal.shouldExecute) {
        pool.totalEquityUsd = Number(Math.max(0, pool.totalEquityUsd - proposal.totalExecutionCostUsd).toFixed(2));
        if (riskResult.emergencyUnwindRequired) {
          venues.forEach(function (v) {
            pool.currentAllocationsUsd[v.id] = 0;
            pool.currentWeightsBps[v.id] = 0;
          });
          pool.liquidReserveUsd = pool.totalEquityUsd;
        } else {
          var allocSum = 0;
          targets.forEach(function (t) {
            var a = Number(((pool.totalEquityUsd * t.targetWeightBps) / 10000).toFixed(2));
            pool.currentAllocationsUsd[t.venueId] = a;
            pool.currentWeightsBps[t.venueId] = t.targetWeightBps;
            allocSum += a;
          });
          pool.liquidReserveUsd = Number(Math.max(0, pool.totalEquityUsd - allocSum).toFixed(2));
        }
      }

      results.push({
        stepIndex: idx + 1,
        regimeLabel: sc.label,
        conditions: Object.assign({ elapsedHours: sc.elapsedHours }, conditions),
        poolAfter: JSON.parse(JSON.stringify(pool)),
        venuesSnapshot: JSON.parse(JSON.stringify(venues)),
        targets: targets,
        riskResult: riskResult,
        proposal: proposal,
        receipt: receipt,
        policySnapshot: JSON.parse(JSON.stringify(policy))
      });

      pool.epochNumber += 1;
    });

    state.backtestSteps = results;
    renderStep(state.activeScenarioIdx);
  }

  function decisionLabel(step) {
    if (step.receipt.actionType === 'EMERGENCY_UNWIND') return 'Move to reserve';
    return step.receipt.executed ? 'Rebalance the portfolio' : 'Hold positions';
  }

  function decisionReason(step) {
    var p = step.proposal;
    if (step.receipt.actionType === 'EMERGENCY_UNWIND') return 'The simulated drawdown reached the safety limit. The model moves the portfolio into its cash reserve.';
    if (step.receipt.executed) return 'The model expects a ' + (p.netApyImprovementBps / 100).toFixed(2) +
      ' percentage-point gain in annual yield. It would recover the switching cost in ' + p.paybackHorizonHours.toFixed(1) + ' hours.';
    if (p.rejectionCode === 'NO_DRIFT') return 'The current allocation is close enough to its target. The model keeps the existing positions.';
    if (p.rejectionCode === 'NEGATIVE_YIELD_GAIN') return 'Switching venues would not improve the modeled yield.';
    if (p.rejectionCode === 'PAYBACK_HORIZON_EXCEEDED') return 'The projected recovery time exceeds the ' + step.policySnapshot.maxPaybackHorizonHours + '-hour limit.';
    return p.reason;
  }

  function renderStep(stepIdx) {
    state.selectedStepIdx = stepIdx;
    var step = state.backtestSteps[stepIdx] || state.backtestSteps[0];
    if (!step) return;

    // Update scenario tabs active state
    var tabs = document.querySelectorAll('.scenario-tab');
    tabs.forEach(function (tab, idx) {
      tab.setAttribute('aria-pressed', String(idx === stepIdx));
      if (idx === stepIdx) tab.classList.add('active');
      else tab.classList.remove('active');
    });

    document.getElementById('mandateEpochTag').textContent = 'EPOCH #' + step.stepIndex;
    document.getElementById('activeRegimeLabel').textContent = 'Period ' + step.stepIndex + ' · ' + document.getElementById('tabScenario' + state.selectedStepIdx).textContent;
    document.getElementById('primaryVaultPdaDisplay').textContent = step.receipt.vaultPda;
    document.getElementById('subAgentVaultPdaDisplay').textContent = step.receipt.subAgentVaultPda;

    // Guardrail checklist
    var policy = step.policySnapshot;
    var risk = step.riskResult;
    var checks = [
      {
        label: 'Drawdown Circuit Breaker',
        detail: (risk.currentDrawdownBps / 100).toFixed(2) + '% / ' + (policy.maxDrawdownCircuitBreakerBps / 100).toFixed(2) + '%',
        status: risk.currentDrawdownBps >= policy.emergencyUnwindDrawdownBps
          ? 'UNWIND'
          : risk.currentDrawdownBps >= policy.maxDrawdownCircuitBreakerBps
          ? 'BLOCK'
          : 'PASS'
      },
      {
        label: '95% Daily Parametric VaR',
        detail: risk.portfolioDailyVaR95Bps + ' / ' + policy.maxDailyVaR95Bps + ' bps',
        status: risk.portfolioDailyVaR95Bps > policy.maxDailyVaR95Bps ? 'BLOCK' : 'PASS'
      },
      {
        label: 'Age of modeled oracle data',
        detail: Math.max(...step.venuesSnapshot.map(v => v.oracleAgeSeconds)) + 's oldest / ' + policy.maxOracleStalenessSeconds + 's maximum',
        status: risk.violations.some(v => v.code === 'ORACLE_STALE') ? 'BLOCK' : 'PASS'
      },
      {
        label: 'Priority Fee Ceiling',
        detail: step.receipt.priorityFeeLamports.toLocaleString() + ' / 250k lamp.',
        status: step.receipt.priorityFeeLamports > policy.maxPriorityFeeLamports ? 'BLOCK' : 'PASS'
      },
      {
        label: 'USDC Reserve Buffer',
        detail: '$' + step.poolAfter.liquidReserveUsd.toLocaleString('en-US', { minimumFractionDigits: 2 }),
        status: step.poolAfter.liquidReserveUsd + 0.005 >= step.poolAfter.totalEquityUsd * policy.minReserveBufferBps / 10000 ? 'PASS' : 'BELOW TARGET'
      }
    ];

    var guardrailHtml = checks.map(function (c) {
      var badgeCls = c.status === 'PASS' ? 'badge-pass' : c.status === 'UNWIND' ? 'badge-alert' : 'badge-warn';
      return (
        '<div class="guardrail-row">' +
          '<div>' +
            '<div style="font-weight:600;">' + escapeHtml(c.label) + '</div>' +
            '<div class="mono" style="font-size:10px;color:var(--cf-ink-muted);">' + escapeHtml(c.detail) + '</div>' +
          '</div>' +
          '<span class="badge ' + badgeCls + '">' + escapeHtml(c.status) + '</span>' +
        '</div>'
      );
    }).join('');
    document.getElementById('guardrailChecklist').innerHTML = guardrailHtml;

    // Top 4 KPI strip
    var eq = step.poolAfter.totalEquityUsd;
    var res = step.poolAfter.liquidReserveUsd;
    var resPct = eq > 0 ? ((res / eq) * 100).toFixed(1) : '0.0';
    document.getElementById('kpiEquityValue').textContent = '$' + eq.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('kpiReserveSub').textContent = 'Reserve: $' + res.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' (' + resPct + '%)';

    var activeApyBps = step.receipt.executed ? step.proposal.proposedWeightedApyBps : step.proposal.currentWeightedApyBps;
    document.getElementById('kpiApyValue').textContent = (activeApyBps / 100).toFixed(2) + '%';
    var sign = step.proposal.netApyImprovementBps >= 0 ? '+' : '';
    document.getElementById('kpiApyDeltaSub').textContent = 'Proposed change: ' + sign + step.proposal.netApyImprovementBps + ' bps';

    var pbText = step.proposal.paybackHorizonHours > 0 && step.proposal.paybackHorizonHours < 99999
      ? step.proposal.paybackHorizonHours.toFixed(1) + 'h'
      : '—';
    document.getElementById('kpiPaybackValue').textContent = pbText;
    document.getElementById('kpiCostSub').textContent = 'Estimated switching cost: $' + step.proposal.totalExecutionCostUsd.toFixed(2);

    document.getElementById('kpiVerdictValue').textContent = decisionLabel(step);
    document.getElementById('riskLevel').textContent = risk.volatilityRegime.charAt(0) + risk.volatilityRegime.slice(1).toLowerCase();
    document.getElementById('kpiRegimeVolSub').textContent = 'Daily value at risk (95%): ' + (risk.portfolioDailyVaR95Bps / 100).toFixed(2) + '%';
    document.getElementById('reservePct').textContent = resPct + '%';
    document.querySelector('.dial').style.setProperty('--deployed', Math.max(0, Math.min(100, 100 - Number(resPct))) + '%');
    document.getElementById('allocatedShare').textContent = 'Allocated ' + (100 - Number(resPct)).toFixed(1) + '%';
    document.getElementById('kpiReserveSub').textContent = 'Reserve ' + resPct + '%';
    document.getElementById('executeTickBtn').innerHTML = (stepIdx === state.backtestSteps.length - 1 ? 'Back to first period' : 'Next period') + ' <span aria-hidden="true">→</span>';

    // Venue Matrix Table
    var matrixHtml = step.targets.map(function (t) {
      var v = step.venuesSnapshot.find(function (x) { return x.id === t.venueId; });
      var leg = step.proposal.legs.find(function (l) { return l.venueId === t.venueId; });
      var netApyPct = (((v.grossApyBps + v.rewardApyBps) / 100)).toFixed(2) + '%';
      var convStr = t.convictionBps >= 0 ? '+' + (t.convictionBps / 100).toFixed(1) + '%' : (t.convictionBps / 100).toFixed(1) + '%';
      var oracleStale = v.oracleAgeSeconds > policy.maxOracleStalenessSeconds || v.oracleConfidenceBps > policy.maxOracleConfidenceBps;
      var oracleBadge = oracleStale
        ? '<span class="badge badge-alert">' + v.oracleAgeSeconds + 's STALE</span>'
        : '<span class="badge badge-pass">' + v.oracleAgeSeconds + 's · ±' + v.oracleConfidenceBps + 'bps</span>';

      var legBadge = 'badge-navy';
      var legText = 'HOLD ($0)';
      if (leg && leg.action === 'DEPOSIT') {
        legBadge = 'badge-pass';
        legText = '+$' + leg.deltaUsd.toLocaleString('en-US', { minimumFractionDigits: 2 }) + ' ALLOC';
      } else if (leg && leg.action === 'WITHDRAW') {
        legBadge = risk.emergencyUnwindRequired ? 'badge-alert' : 'badge-warn';
        legText = '-$' + Math.abs(leg.deltaUsd).toLocaleString('en-US', { minimumFractionDigits: 2 }) + (risk.emergencyUnwindRequired ? ' UNWIND' : ' WITHDRAW');
      }

      var capTag = t.cappedByConcentration ? ' <span class="badge badge-warn">CAP</span>' : '';

      return (
        '<tr>' +
          '<td>' +
            '<div class="venue-name">' + escapeHtml(v.name) + '</div>' +
            '<div class="venue-prog">' + escapeHtml(v.programId.slice(0, 16)) + '... · ' + escapeHtml(v.strategyLabel) + '</div>' +
          '</td>' +
          '<td class="mono">' +
            '<strong>' + escapeHtml(netApyPct) + '</strong>' +
            '<div style="font-size:10px;color:var(--cf-ink-muted);">Scenario adjustment: ' + escapeHtml(convStr) + '</div>' +
          '</td>' +
          '<td class="mono">' +
            escapeHtml(t.sharpeRatio.toFixed(2)) + ' / ' + escapeHtml(t.sortinoRatio.toFixed(2)) +
            '<div style="font-size:10px;color:var(--cf-ink-muted);">Score: ' + escapeHtml(t.riskAdjustedScore.toFixed(3)) + '</div>' +
          '</td>' +
          '<td>' + oracleBadge + '</td>' +
          '<td class="mono">' +
            escapeHtml((t.currentWeightBps / 100).toFixed(1)) + '% → <strong>' + escapeHtml((t.targetWeightBps / 100).toFixed(1)) + '%</strong>' + capTag +
            '<div class="weight-bar-track"><div class="weight-bar-fill" style="width:' + Math.min(100, t.targetWeightBps / 100) + '%;"></div></div>' +
          '</td>' +
          '<td><span class="badge ' + legBadge + '">' + escapeHtml(legText) + '</span></td>' +
        '</tr>'
      );
    }).join('');
    document.getElementById('venueMatrixBody').innerHTML = matrixHtml;

    // Economics Strip
    var hrSign = step.proposal.hourlyYieldGainUsd >= 0 ? '+$' : '-$';
    document.getElementById('econHourlyGain').textContent = hrSign + Math.abs(step.proposal.hourlyYieldGainUsd).toFixed(4) + ' / hr';
    document.getElementById('econTurnover').textContent = '$' + step.proposal.totalTurnoverUsd.toLocaleString('en-US', { minimumFractionDigits: 2 });
    document.getElementById('econTotalCost').textContent = '$' + step.proposal.totalExecutionCostUsd.toFixed(4);
    document.getElementById('econMultiHopperStatus').textContent = step.receipt.multiHopperRouteId
      ? 'Active (' + step.receipt.multiHopperRouteId.slice(0, 16) + ')'
      : 'Not Required (0 Hops)';

    document.getElementById('proposalReasonBanner').textContent = decisionReason(step);
    var choices = document.getElementById('periodList');
    if (!choices.childElementCount) {
      state.backtestSteps.forEach(function (period, idx) {
        var item = document.createElement('button');
        item.type = 'button';
        item.addEventListener('click', function () {
          state.activeScenarioIdx = idx;
          renderStep(idx);
          showDecision();
          recordWorkflowStage('result_ready');
        });
        choices.appendChild(item);
      });
    }
    state.backtestSteps.forEach(function (period, idx) {
      var item = choices.children[idx];
      item.setAttribute('aria-pressed', String(idx === stepIdx));
      item.innerHTML = '<span>Period ' + period.stepIndex + '</span><b>' + escapeHtml(decisionLabel(period)) + '</b><small>' +
        escapeHtml(period.poolAfter.totalEquityUsd.toLocaleString('en-US', {style:'currency', currency:'USD'})) + '</small>';
    });

    // 5-Epoch Backtest Ledger Table
    var backtestHtml = state.backtestSteps.map(function (st, idx) {
      var rowCls = idx === stepIdx ? 'clickable-row selected-row' : 'clickable-row';
      var actBadge = st.receipt.actionType === 'EMERGENCY_UNWIND'
        ? '<span class="badge badge-alert">EMERGENCY_UNWIND</span>'
        : st.receipt.executed
        ? '<span class="badge badge-pass">REBALANCE</span>'
        : '<span class="badge badge-warn">HOLD (' + escapeHtml(st.proposal.rejectionCode || 'HOLD') + ')</span>';
      var stApy = ((st.receipt.executed ? st.proposal.proposedWeightedApyBps : st.proposal.currentWeightedApyBps) / 100).toFixed(2) + '%';
      var stPb = st.proposal.paybackHorizonHours > 0 && st.proposal.paybackHorizonHours < 99999
        ? st.proposal.paybackHorizonHours.toFixed(1) + 'h'
        : '—';

      return (
        '<tr class="' + rowCls + '" data-step-row="' + idx + '">' +
          '<td><button class="period-jump" type="button">' + escapeHtml(document.getElementById('tabScenario' + idx).textContent) + ' · ' + st.stepIndex + '</button></td>' +
          '<td>' + actBadge + '</td>' +
          '<td class="mono">$' + st.poolAfter.totalEquityUsd.toLocaleString('en-US', { minimumFractionDigits: 2 }) + '</td>' +
          '<td class="mono">' + escapeHtml(stApy) + '</td>' +
          '<td class="mono">$' + st.proposal.totalTurnoverUsd.toLocaleString('en-US', { minimumFractionDigits: 2 }) + '</td>' +
          '<td class="mono">' + escapeHtml(stPb) + '</td>' +
          '<td class="mono">' + escapeHtml(st.receipt.decisionHashSha256.slice(0, 12)) + '…</td>' +
        '</tr>'
      );
    }).join('');
    document.getElementById('backtestLedgerBody').innerHTML = backtestHtml;

    document.querySelectorAll('[data-step-row]').forEach(function (row) {
      row.addEventListener('click', function () {
        var rIdx = Number(row.getAttribute('data-step-row'));
        state.activeScenarioIdx = rIdx;
        renderStep(rIdx);
        showDecision();
      });
    });

    // Right Column: Receipt & Instructions
    document.getElementById('receiptDecisionHash').textContent = step.receipt.decisionHashSha256;
    document.getElementById('receiptMultiHopperId').textContent = step.receipt.multiHopperRouteId || 'NONE (Direct Hold)';
    document.getElementById('receiptComputeUnits').textContent =
      step.receipt.totalComputeUnits.toLocaleString() + ' CU · ' + step.receipt.priorityFeeLamports.toLocaleString() + ' lamp.';
    document.getElementById('receiptAceHash').textContent = step.receipt.aceResearchBriefHash;
    document.getElementById('ixCountBadge').textContent = step.receipt.instructions.length + ' Instructions';

    if (step.receipt.instructions.length === 0) {
      document.getElementById('instructionBundleList').innerHTML =
        '<div class="ix-card">' +
          '<div class="ix-top"><span class="ix-name">No modeled instructions</span><span class="badge badge-pass">0 simulated compute units</span></div>' +
          '<div class="ix-data">Anti-churn or guardrail hold suppressed transaction emission to preserve vault principal.</div>' +
        '</div>';
    } else {
      document.getElementById('instructionBundleList').innerHTML = step.receipt.instructions.map(function (ix, i) {
        var venueSuffix = ix.venueId ? ' · ' + ix.venueId.toUpperCase() : '';
        var amtSuffix = ix.amountUsd ? ' ($' + ix.amountUsd.toLocaleString('en-US', { minimumFractionDigits: 2 }) + ')' : '';
        return (
          '<div class="ix-card">' +
            '<div class="ix-top">' +
              '<span class="ix-name">#' + (i + 1) + ' ' + escapeHtml(ix.instructionName + venueSuffix + amtSuffix) + '</span>' +
              '<span class="ix-cu">' + ix.estimatedComputeUnits.toLocaleString() + ' CU</span>' +
            '</div>' +
            '<div class="ix-data">Program: ' + escapeHtml(ix.programId.slice(0, 26)) + '... | Data: 0x' + escapeHtml(ix.dataHex) + '</div>' +
          '</div>'
        );
      }).join('');
    }

    document.getElementById('receiptJsonPreview').textContent = JSON.stringify(step.receipt, null, 2);
    document.getElementById('copyFeedbackLabel').textContent = '';
  }

  // Wire Sliders & Buttons
  function syncSliderLabels() {
    var cap = Number(document.getElementById('capitalSlider').value);
    document.getElementById('capitalValDisplay').textContent = '$' + cap.toLocaleString('en-US');
    document.getElementById('maxCapValDisplay').textContent = document.getElementById('maxCapSlider').value + '.0%';
    document.getElementById('reserveValDisplay').textContent = document.getElementById('reserveSlider').value + '.0%';
    document.getElementById('paybackValDisplay').textContent = document.getElementById('paybackSlider').value + 'h';
    var ddBps = Number(document.getElementById('drawdownSlider').value);
    document.getElementById('drawdownValDisplay').textContent = '-' + (ddBps / 100).toFixed(2) + '%';
    var pf = Number(document.getElementById('priorityFeeSlider').value);
    document.getElementById('priorityFeeValDisplay').textContent = pf.toLocaleString('en-US');
  }

  ['capitalSlider', 'maxCapSlider', 'reserveSlider', 'paybackSlider', 'drawdownSlider', 'priorityFeeSlider'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', function () {
      if (id === 'priorityFeeSlider' || id === 'drawdownSlider') {
        if(id==='drawdownSlider' && candleSource){state.periodInputs[state.activeScenarioIdx].drawdownSource='manual';describeHistory();}
        state.periodInputs[state.activeScenarioIdx][id === 'priorityFeeSlider' ? 'priorityFeeLamports' : 'drawdownBps'] = Number(this.value);
      }
      syncSliderLabels();
      runFull5EpochSimulation();
    });
  });

  document.querySelectorAll('.mini-pill').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.getAttribute('data-capital');
      document.getElementById('capitalSlider').value = val;
      syncSliderLabels();
      runFull5EpochSimulation();
    });
  });

  function showDecision() {
    document.getElementById('kpiVerdictValue').focus({preventScroll:true});
    document.getElementById('decision').scrollIntoView({block:'start'});
  }

  function recordWorkflowStage(stage) {
    window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: stage } }));
  }

  function selectPeriod(idx) {
    state.activeScenarioIdx = idx;
    var conditions = state.periodInputs[idx];
    document.getElementById('drawdownSlider').value = conditions.drawdownBps;
    document.getElementById('priorityFeeSlider').value = conditions.priorityFeeLamports;
    syncSliderLabels();
    renderStep(idx);
    recordWorkflowStage('result_ready');
  }

  document.querySelectorAll('.scenario-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      recordWorkflowStage('sample_selected');
      selectPeriod(Number(tab.getAttribute('data-scenario')));
      showDecision();
    });
  });

  document.getElementById('executeTickBtn').addEventListener('click', function () {
    selectPeriod((state.selectedStepIdx + 1) % state.periodInputs.length);
  });

  document.getElementById('runBacktestBtn').addEventListener('click', function () {
    var comparison = document.getElementById('comparison');
    comparison.hidden = !comparison.hidden;
    this.setAttribute('aria-expanded', String(!comparison.hidden));
    if (!comparison.hidden) {
      document.getElementById('compareTitle').focus({preventScroll:true});
      comparison.scrollIntoView({block:'start'});
      recordWorkflowStage('result_ready');
    }
  });

  document.getElementById('resetVaultBtn').addEventListener('click', function () {
    document.getElementById('capitalSlider').value = '100000';
    document.getElementById('maxCapSlider').value = '35';
    document.getElementById('reserveSlider').value = '10';
    document.getElementById('paybackSlider').value = '72';
    document.getElementById('drawdownSlider').value = '0';
    document.getElementById('priorityFeeSlider').value = '35000';
    state.activeScenarioIdx = 0;
    importGeneration++;resetHistory();candleFile.value='';candleStatus.textContent='';document.getElementById('downloadAuditBtn').disabled=false;
    state.periodInputs = defaultPeriodInputs();
    syncSliderLabels();
    runFull5EpochSimulation();
  });

  document.getElementById('copyReceiptBtn').addEventListener('click', async function () {
    var step = state.backtestSteps[state.selectedStepIdx];
    if (!step) return;
    var feedback = document.getElementById('copyFeedbackLabel');
    try {
      await navigator.clipboard.writeText(JSON.stringify(step.receipt, null, 2));
      feedback.textContent = 'Receipt copied';
    } catch (error) {
      var preview = document.getElementById('receiptJsonPreview');
      preview.closest('details').open = true;
      feedback.textContent = 'Could not copy. Select the JSON below and copy it manually.';
    }
  });

  document.getElementById('downloadAuditBtn').addEventListener('click', function () {
    var payload = {
      exportedAt: new Date().toISOString(),
      agentId: 'oobe-sentinel-capital-agent-01',
      runtime: 'Local browser simulation',
      historicalInput: candleSource,
      simulated: true,
      initialCapitalUsd: Number(document.getElementById('capitalSlider').value),
      policy: getPolicyFromSliders(),
      epochs: state.backtestSteps.map(function (s) {
        return {
          stepIndex: s.stepIndex,
          regimeLabel: s.regimeLabel,
          conditions: s.conditions,
          poolAfter: s.poolAfter,
          riskResult: s.riskResult,
          proposal: s.proposal,
          receipt: s.receipt
        };
      })
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'oobe-sentinel-simulation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    recordWorkflowStage('export_ready');
  });

  // Initial render
  syncSliderLabels();
  runFull5EpochSimulation();
})();
