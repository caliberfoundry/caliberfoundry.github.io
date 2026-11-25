(function () {
      'use strict';

      /* =====================================================================
         1. EMBEDDED REAL-FORMAT DEMO & MUTATION CSV DATASETS (WORKS OFFLINE)
         ===================================================================== */
      const DEMO_DATASETS = {
        aws_cur: {
          key: 'aws_cur',
          filename: '01_aws_cur_baseline.csv',
          label: 'AWS CUR · Production sample',
          csv: [
            'lineItem/UsageStartDate,lineItem/ProductCode,lineItem/UsageType,lineItem/Operation,lineItem/LineItemType,lineItem/ResourceId,product/region,pricing/term,lineItem/UsageAmount,lineItem/UnblendedCost',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-BoxUsage:m6i.4xlarge,RunInstances,Usage,i-0a91prodapi01,us-east-1,OnDemand,720,4200.00',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-BoxUsage:c6i.2xlarge,RunInstances,Usage,i-0b44worker02,us-east-1,OnDemand,720,1650.00',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-BoxUsage:m6i.2xlarge,RunInstances,SavingsPlanCoveredUsage,i-0c12core03,us-east-1,SavingsPlans,720,1480.00',
            '2026-11-01T00:00:00Z,AmazonRDS,USE1-InstanceUsage:db.r6g.2xlarge,CreateDBInstance:0014,Usage,arn:aws:rds:us-east-1:111122223333:db:prod-pg-01,us-east-1,OnDemand,720,2150.00',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-EBS:VolumeUsage.gp2,CreateVolume-Gp2,Usage,vol-0dead8821-unattached,us-east-1,OnDemand,3125,312.50',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-EBS:SnapshotUsage,CreateSnapshot,Usage,snap-0old2024archive,us-east-1,OnDemand,4800,240.00',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-EBS:VolumeUsage.gp3,CreateVolume-Gp3,Usage,vol-0prod9910-active,us-east-1,OnDemand,4000,320.00',
            '2026-11-01T00:00:00Z,AmazonVPC,USE1-NatGateway-Bytes,NatGateway,Usage,nat-0prod7712,us-east-1,OnDemand,18500,832.50',
            '2026-11-01T00:00:00Z,AmazonVPC,USE1-NatGateway-Hours,NatGateway,Usage,nat-0prod7712,us-east-1,OnDemand,720,32.40',
            '2026-11-01T00:00:00Z,AmazonCloudWatch,USE1-DataProcessing-Bytes,PutLogEvents,Usage,log-group:/aws/eks/prod-verbose,us-east-1,OnDemand,1135,567.50',
            '2026-11-01T00:00:00Z,AmazonS3,USE1-TimedStorage-ByteHrs,StandardStorage,Usage,arn:aws:s3:::prod-analytics-lake,us-east-1,OnDemand,29352,675.10',
            '2026-11-01T00:00:00Z,ComputeSavingsPlans,USE1-SP-Unused,SavingsPlanRecurringFee,SavingsPlanRecurringFee,sp-0unused991,us-east-1,Unused,720,380.00'
          ].join('\n')
        },
        focus_1_0: {
          key: 'focus_1_0',
          filename: '02_focus_multicloud.csv',
          label: 'FinOps FOCUS 1.0 · Multi-Cloud (AWS + GCP)',
          csv: [
            'BillingPeriodStart,BillingPeriodEnd,ProviderName,ServiceName,ServiceCategory,ChargeCategory,PricingCategory,CommitmentDiscountStatus,ResourceId,ResourceName,RegionName,ConsumedQuantity,ConsumedUnit,BilledCost,EffectiveCost',
            '2026-11-01,2026-11-30,AWS,Amazon EC2,Compute,Usage,Standard,,i-08f1eu01,checkout-api-eu,eu-central-1,720,Hours,3400.00,3400.00',
            '2026-11-01,2026-11-30,AWS,Amazon EC2,Compute,Usage,Committed,Used,i-08f1eu02,checkout-core-eu,eu-central-1,720,Hours,0.00,2100.00',
            '2026-11-01,2026-11-30,AWS,Compute Savings Plan,Compute,Usage,Committed,Unused,sp-eu-04,sp-unused-eu,eu-central-1,720,Hours,450.00,450.00',
            '2026-11-01,2026-11-30,GCP,Compute Engine,Compute,Usage,Standard,,gce-ml-batch-01,ml-feature-worker,europe-west3,720,Hours,2600.00,2600.00',
            '2026-11-01,2026-11-30,GCP,Cloud SQL,Databases,Usage,Standard,,sql-prod-eu,orders-postgres,europe-west3,720,Hours,1500.00,1500.00',
            '2026-11-01,2026-11-30,GCP,Persistent Disk,Storage,Usage,Standard,,disk-unattached-09,legacy-backup-unattached,europe-west3,2000,GB-Month,340.00,340.00',
            '2026-11-01,2026-11-30,AWS,NAT Gateway,Networking,Usage,Standard,,nat-eu-01,prod-nat-egress-bytes,eu-central-1,16000,GB,720.00,720.00',
            '2026-11-01,2026-11-30,GCP,Cloud Logging,Observability,Usage,Standard,,log-sink-01,debug-ingest-logs,europe-west3,960,GB,480.00,480.00',
            '2026-11-01,2026-11-30,AWS,Amazon S3,Storage,Usage,Standard,,s3-media-eu,customer-assets-eu,eu-central-1,18000,GB-Month,410.00,410.00',
            '2026-11-01,2026-11-30,AWS,Compute Savings Plan,Compute,Purchase,Committed,,sp-eu-purchase,sp-monthly-installment,eu-central-1,1,Unit,2100.00,0.00'
          ].join('\n')
        },
        llm_usage: {
          key: 'llm_usage',
          filename: '03_llm_openai_anthropic.csv',
          label: 'OpenAI + Anthropic API · LLM Billing CSV',
          csv: [
            'start_datetime,provider,model,project_id,input_tokens,input_cached_tokens,output_tokens,num_model_requests,batch,cost_usd',
            '2026-11-01T00:00:00Z,OpenAI,gpt-4o,proj_support_rag,420000000,21000000,48000000,185000,false,1500.00',
            '2026-11-01T00:00:00Z,OpenAI,gpt-4o,proj_doc_extract,310000000,0,35000000,92000,false,1100.00',
            '2026-11-01T00:00:00Z,OpenAI,gpt-4o-mini,proj_classifier,650000000,195000000,90000000,1400000,true,140.00',
            '2026-11-01T00:00:00Z,Anthropic,claude-3-7-sonnet,proj_legal_review,280000000,14000000,32000000,64000,false,1300.00',
            '2026-11-01T00:00:00Z,Anthropic,claude-3-7-sonnet,proj_code_audit,220000000,132000000,26000000,48000,false,760.00',
            '2026-11-01T00:00:00Z,Anthropic,claude-3-5-haiku,proj_triage,500000000,250000000,60000000,820000,false,420.00',
            '2026-11-01T00:00:00Z,OpenAI,o3-mini,proj_sql_batch,180000000,36000000,45000000,41000,true,380.00'
          ].join('\n')
        },
        mutation_a: {
          key: 'mutation_a',
          filename: 'mutation_a_aws_cur_sp_covered.csv',
          label: 'AWS after commitment and disk cleanup',
          csv: [
            'lineItem/UsageStartDate,lineItem/ProductCode,lineItem/UsageType,lineItem/Operation,lineItem/LineItemType,lineItem/ResourceId,product/region,pricing/term,lineItem/UsageAmount,lineItem/UnblendedCost',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-BoxUsage:m6i.4xlarge,RunInstances,SavingsPlanCoveredUsage,i-0a91prodapi01,us-east-1,SavingsPlans,720,3108.00',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-BoxUsage:c6i.2xlarge,RunInstances,Usage,i-0b44worker02,us-east-1,OnDemand,720,1650.00',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-BoxUsage:m6i.2xlarge,RunInstances,SavingsPlanCoveredUsage,i-0c12core03,us-east-1,SavingsPlans,720,1480.00',
            '2026-11-01T00:00:00Z,AmazonRDS,USE1-InstanceUsage:db.r6g.2xlarge,CreateDBInstance:0014,Usage,arn:aws:rds:us-east-1:111122223333:db:prod-pg-01,us-east-1,OnDemand,720,2150.00',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-EBS:SnapshotUsage,CreateSnapshot,Usage,snap-0old2024archive,us-east-1,OnDemand,4800,240.00',
            '2026-11-01T00:00:00Z,AmazonEC2,USE1-EBS:VolumeUsage.gp3,CreateVolume-Gp3,Usage,vol-0prod9910-active,us-east-1,OnDemand,4000,320.00',
            '2026-11-01T00:00:00Z,AmazonVPC,USE1-NatGateway-Bytes,NatGateway,Usage,nat-0prod7712,us-east-1,OnDemand,18500,832.50',
            '2026-11-01T00:00:00Z,AmazonVPC,USE1-NatGateway-Hours,NatGateway,Usage,nat-0prod7712,us-east-1,OnDemand,720,32.40',
            '2026-11-01T00:00:00Z,AmazonCloudWatch,USE1-DataProcessing-Bytes,PutLogEvents,Usage,log-group:/aws/eks/prod-verbose,us-east-1,OnDemand,1135,567.50',
            '2026-11-01T00:00:00Z,AmazonS3,USE1-TimedStorage-ByteHrs,StandardStorage,Usage,arn:aws:s3:::prod-analytics-lake,us-east-1,OnDemand,29352,675.10',
            '2026-11-01T00:00:00Z,ComputeSavingsPlans,USE1-SP-Unused,SavingsPlanRecurringFee,SavingsPlanRecurringFee,sp-0unused991,us-east-1,Unused,720,380.00'
          ].join('\n')
        },
        mutation_b: {
          key: 'mutation_b',
          filename: 'mutation_b_llm_high_cache_batch.csv',
          label: 'LLM after caching and added usage',
          csv: [
            'start_datetime,provider,model,project_id,input_tokens,input_cached_tokens,output_tokens,num_model_requests,batch,cost_usd',
            '2026-11-01T00:00:00Z,OpenAI,gpt-4o,proj_support_rag,420000000,302400000,48000000,185000,true,1050.00',
            '2026-11-01T00:00:00Z,OpenAI,gpt-4o,proj_doc_extract,310000000,0,35000000,92000,false,1100.00',
            '2026-11-01T00:00:00Z,OpenAI,gpt-4o-mini,proj_classifier,650000000,195000000,90000000,1400000,true,140.00',
            '2026-11-01T00:00:00Z,Anthropic,claude-3-7-sonnet,proj_legal_review,280000000,14000000,32000000,64000,false,1300.00',
            '2026-11-01T00:00:00Z,Anthropic,claude-3-7-sonnet,proj_code_audit,220000000,132000000,26000000,48000,false,760.00',
            '2026-11-01T00:00:00Z,Anthropic,claude-3-5-haiku,proj_triage,500000000,250000000,60000000,820000,false,420.00',
            '2026-11-01T00:00:00Z,OpenAI,o3-mini,proj_sql_batch,180000000,36000000,45000000,41000,true,380.00',
            '2026-11-15T00:00:00Z,Anthropic,claude-3-7-sonnet,proj_new_agent_loop,540000000,0,75000000,115000,false,2850.00'
          ].join('\n')
        }
      };

      const SCENARIO_PRESETS = {
        conservative: {
          name: 'Cautious',
          computeSpDiscountPct: 18,
          idleCleanupPct: 50,
          networkLogOptPct: 20,
          llmCacheTargetPct: 30,
          llmBatchRoutePct: 15
        },
        base: {
          name: 'Base',
          computeSpDiscountPct: 24,
          idleCleanupPct: 70,
          networkLogOptPct: 35,
          llmCacheTargetPct: 45,
          llmBatchRoutePct: 25
        },
        aggressive: {
          name: 'Stretch',
          computeSpDiscountPct: 32,
          idleCleanupPct: 85,
          networkLogOptPct: 50,
          llmCacheTargetPct: 65,
          llmBatchRoutePct: 40
        }
      };

      /* =====================================================================
         2. PURE DETERMINISTIC ENGINE (PARSER, CLASSIFIER, SAVINGS MODEL)
         ===================================================================== */
      function escapeHtml(value) {
        return String(value == null ? '' : value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }

      function roundCents(num) {
        return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
      }

      function formatUsd(num) {
        const val = Number(num) || 0;
        const sign = val < 0 ? '-' : '';
        return sign + '$' + Math.abs(val).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }

      function formatSignedUsd(num) {
        const val = roundCents(num);
        if (val > 0) return '+' + formatUsd(val);
        if (val < 0) return formatUsd(val);
        return '$0.00';
      }

      function formatPct(num) {
        return (Number(num) || 0).toFixed(1) + '%';
      }

      function computeFingerprint(text) {
        // Deterministic 64-bit split FNV-1a hex fingerprint
        let h1 = 0x811c9dc5;
        let h2 = 0x9e3779b9;
        const str = String(text || '');
        for (let i = 0; i < str.length; i++) {
          const c = str.charCodeAt(i);
          h1 ^= c;
          h1 = Math.imul(h1, 0x01000193);
          h2 ^= (c + i) & 0xff;
          h2 = Math.imul(h2, 0x85ebca6b);
        }
        return ((h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0')).toUpperCase();
      }

      function parseNumericValue(raw) {
        if (raw == null) return NaN;
        let s = String(raw).trim();
        if (!s) return NaN;
        let negative = false;
        if (s.startsWith('(') && s.endsWith(')')) {
          negative = true;
          s = s.slice(1, -1);
        }
        s = s.replace(/[$€£¥\s]/g, '');
        // Handle US thousands separator vs single comma decimal
        if (s.includes(',') && s.includes('.')) {
          s = s.replace(/,/g, '');
        } else if (s.includes(',') && !s.includes('.')) {
          const parts = s.split(',');
          if (parts.length === 2 && parts[1].length <= 2) {
            s = parts[0] + '.' + parts[1];
          } else {
            s = s.replace(/,/g, '');
          }
        }
        const n = Number(s);
        if (!Number.isFinite(n)) return NaN;
        return negative ? -n : n;
      }

      function detectDelimiter(firstLine) {
        let commas = 0;
        let semis = 0;
        let inQuotes = false;
        for (let i = 0; i < firstLine.length; i++) {
          const ch = firstLine[i];
          if (ch === '"') inQuotes = !inQuotes;
          else if (!inQuotes) {
            if (ch === ',') commas++;
            else if (ch === ';') semis++;
          }
        }
        return semis > commas ? ';' : ',';
      }

      function parseCsv(csvText) {
        const cleaned = String(csvText || '').replace(/^\uFEFF/, '');
        if (!cleaned.trim()) {
          return { headers: [], rows: [], delimiter: ',', error: 'The CSV is empty. Select a file or enter a header and at least one data row.' };
        }
        const firstNewline = cleaned.search(/\r?\n/);
        const firstLine = firstNewline >= 0 ? cleaned.slice(0, firstNewline) : cleaned;
        const delimiter = detectDelimiter(firstLine);

        const matrix = [];
        let row = [];
        let field = '';
        let inQuotes = false;

        for (let i = 0; i < cleaned.length; i++) {
          const ch = cleaned[i];
          const next = cleaned[i + 1];

          if (inQuotes) {
            if (ch === '"' && next === '"') {
              field += '"';
              i++;
            } else if (ch === '"') {
              inQuotes = false;
            } else {
              field += ch;
            }
          } else {
            if (ch === '"') {
              inQuotes = true;
            } else if (ch === delimiter) {
              row.push(field.trim());
              field = '';
            } else if (ch === '\r' && next === '\n') {
              row.push(field.trim());
              if (row.some((cell) => cell !== '')) matrix.push(row);
              row = [];
              field = '';
              i++;
            } else if (ch === '\n' || ch === '\r') {
              row.push(field.trim());
              if (row.some((cell) => cell !== '')) matrix.push(row);
              row = [];
              field = '';
            } else {
              field += ch;
            }
          }
        }
        if (inQuotes) return { headers: [], rows: [], delimiter, error: 'A quoted field is missing its closing quote.' };
        row.push(field.trim());
        if (row.some((cell) => cell !== '')) matrix.push(row);

        if (matrix.length < 2) {
          return { headers: matrix[0] || [], rows: [], delimiter, error: 'The CSV has a header but no data rows.' };
        }

        const headers = matrix[0];
        const rows = [];
        for (let r = 1; r < matrix.length; r++) {
          const values = matrix[r];
          const obj = Object.create(null);
          for (let c = 0; c < headers.length; c++) {
            obj[headers[c]] = values[c] !== undefined ? values[c] : '';
          }
          obj.__rowIndex = r + 1;
          rows.push(obj);
        }

        return { headers, rows, delimiter, error: null };
      }

      function buildHeaderLookup(headers) {
        const map = Object.create(null);
        for (const h of headers) {
          map[h.trim().toLowerCase()] = h;
        }
        return map;
      }

      function pickCol(lookup, candidates) {
        for (const c of candidates) {
          if (lookup[c.toLowerCase()]) return lookup[c.toLowerCase()];
        }
        return null;
      }

      function detectSchema(headers) {
        const lookup = buildHeaderLookup(headers);

        // 1. AWS CUR
        const awsCost = pickCol(lookup, ['lineItem/UnblendedCost', 'line_item_unblended_cost', 'lineItem/BlendedCost']);
        const awsProd = pickCol(lookup, ['lineItem/ProductCode', 'line_item_product_code', 'product/ProductCode']);
        if (awsCost && awsProd) {
          return {
            id: 'AWS_CUR',
            label: 'AWS Cost & Usage Report (CUR)',
            columnMap: {
              date: pickCol(lookup, ['lineItem/UsageStartDate', 'line_item_usage_start_date']),
              service: awsProd,
              usageType: pickCol(lookup, ['lineItem/UsageType', 'line_item_usage_type']),
              operation: pickCol(lookup, ['lineItem/Operation', 'line_item_operation']),
              lineItemType: pickCol(lookup, ['lineItem/LineItemType', 'line_item_line_item_type']),
              resourceId: pickCol(lookup, ['lineItem/ResourceId', 'line_item_resource_id']),
              region: pickCol(lookup, ['product/region', 'product_region']),
              pricingTerm: pickCol(lookup, ['pricing/term', 'pricing_term']),
              cost: awsCost
            }
          };
        }

        // 2. FinOps FOCUS 1.0
        const focusEff = pickCol(lookup, ['EffectiveCost']);
        const focusBilled = pickCol(lookup, ['BilledCost']);
        const focusService = pickCol(lookup, ['ServiceName']);
        if ((focusEff || focusBilled) && focusService) {
          return {
            id: 'FOCUS_1_0',
            label: 'FinOps FOCUS 1.0',
            columnMap: {
              dateStart: pickCol(lookup, ['BillingPeriodStart', 'ChargePeriodStart']),
              dateEnd: pickCol(lookup, ['BillingPeriodEnd', 'ChargePeriodEnd']),
              provider: pickCol(lookup, ['ProviderName']),
              service: focusService,
              serviceCategory: pickCol(lookup, ['ServiceCategory']),
              chargeCategory: pickCol(lookup, ['ChargeCategory']),
              pricingCategory: pickCol(lookup, ['PricingCategory']),
              commitmentStatus: pickCol(lookup, ['CommitmentDiscountStatus']),
              resourceId: pickCol(lookup, ['ResourceId']),
              resourceName: pickCol(lookup, ['ResourceName']),
              region: pickCol(lookup, ['RegionName', 'RegionId']),
              billedCost: focusBilled,
              effectiveCost: focusEff
            }
          };
        }

        // 3. OpenAI / Anthropic LLM Usage CSV
        const llmModel = pickCol(lookup, ['model', 'model_name', 'line_item']);
        const llmInput = pickCol(lookup, ['input_tokens', 'prompt_tokens', 'n_context_tokens_total']);
        const llmCost = pickCol(lookup, ['cost_usd', 'amount_value', 'cost', 'total_cost_usd']);
        if (llmModel && (llmInput || llmCost)) {
          return {
            id: 'LLM_USAGE',
            label: 'LLM API Usage & Cost CSV (OpenAI / Anthropic)',
            columnMap: {
              date: pickCol(lookup, ['start_datetime', 'start_time', 'date', 'usage_date']),
              provider: pickCol(lookup, ['provider', 'vendor']),
              model: llmModel,
              project: pickCol(lookup, ['project_id', 'workspace', 'api_key_id', 'team']),
              inputTokens: llmInput,
              cachedInputTokens: pickCol(lookup, ['input_cached_tokens', 'cached_tokens']),
              anthropicCacheReadTokens: pickCol(lookup, ['cache_read_input_tokens']),
              outputTokens: pickCol(lookup, ['output_tokens', 'completion_tokens', 'n_generated_tokens_total']),
              requests: pickCol(lookup, ['num_model_requests', 'requests']),
              batch: pickCol(lookup, ['batch', 'is_batch', 'tier']),
              cost: llmCost
            }
          };
        }

        // 4. Generic Cloud Billing CSV fallback
        const genCost = pickCol(lookup, ['cost', 'cost_usd', 'amount', 'spend', 'unblended_cost', 'billed_cost', 'total']);
        const genService = pickCol(lookup, ['service', 'product', 'service_name', 'category', 'resource']);
        if (genCost && genService) {
          return {
            id: 'GENERIC_CSV',
            label: 'Generic billing CSV',
            columnMap: {
              date: pickCol(lookup, ['date', 'period', 'month', 'timestamp']),
              provider: pickCol(lookup, ['provider', 'cloud', 'vendor']),
              service: genService,
              resourceId: pickCol(lookup, ['resource_id', 'resource', 'name', 'project']),
              region: pickCol(lookup, ['region', 'location']),
              pricingTerm: pickCol(lookup, ['pricing_term', 'pricing', 'term', 'commitment']),
              cost: genCost
            }
          };
        }

        return {
          id: 'UNKNOWN',
          label: 'Unrecognized CSV schema',
          columnMap: {}
        };
      }

      const CLASS_LABELS = {
        ondemand_compute: { text: 'On-demand compute or database', badge: 'badge-fact' },
        committed_used: { text: 'Covered by commitment', badge: 'badge-neutral' },
        unused_commitment: { text: 'Unused commitment', badge: 'badge-waste' },
        idle_storage: { text: 'Potential idle storage', badge: 'badge-waste' },
        network_logs: { text: 'Network or log ingestion', badge: 'badge-fact' },
        active_baseline: { text: 'Other spend', badge: 'badge-neutral' },
        credit_refund: { text: 'Credit or refund', badge: 'badge-neutral' },
        commitment_purchase_amortized: { text: 'FOCUS Purchase (Effective = $0)', badge: 'badge-neutral' },
        llm_usage: { text: 'Model API usage', badge: 'badge-fact' }
      };

      function analyzeBillingCsv(csvText, filename, assumptionsInput) {
        const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
        const assumptions = Object.assign({}, SCENARIO_PRESETS.base, assumptionsInput || {});
        const fingerprint = computeFingerprint(csvText);
        const parsed = parseCsv(csvText);

        if (parsed.error) {
          return { error: parsed.error, fingerprint, filename };
        }

        const schema = detectSchema(parsed.headers);
        if (schema.id === 'UNKNOWN') {
          return {
            error: 'No matching service and cost columns. Use AWS CUR, FOCUS, model/cost_usd, or a CSV with service and cost columns.',
            fingerprint,
            filename,
            headers: parsed.headers
          };
        }

        const map = schema.columnMap;
        const currencyColumn = pickCol(buildHeaderLookup(parsed.headers),
          ['BillingCurrency', 'lineItem/CurrencyCode', 'line_item_currency_code', 'currency', 'currency_code', 'amount_currency']);
        const costs = [map.cost, map.effectiveCost, map.billedCost].filter(Boolean);
        if (parsed.rows.some(row => (currencyColumn && row[currencyColumn] && row[currencyColumn].toUpperCase() !== 'USD') ||
            costs.some(column => /[€£¥]/.test(row[column])))) {
          return { error: 'This audit uses USD. Convert the export to a single USD billing currency before importing.', fingerprint, filename };
        }
        const normalizedRows = [];
        const skippedRows = [];
        const dates = [];

        let confirmedEffectiveTotal = 0;
        let confirmedBilledTotal = 0;
        let confirmedUnusedCommitment = 0;
        let confirmedIdleStorage = 0;

        // Mutually exclusive cloud bases
        let baseOnDemandCompute = 0;
        let baseIdleAndUnused = 0;
        let baseNetworkAndLogs = 0;

        // LLM bases & sequential savings
        let baseLlmCacheEligible = 0;
        let baseLlmRouteEligible = 0;
        let estLlmCacheSavings = 0;
        let estLlmRouteSavings = 0;
        const llmCacheTargetRatio = (Number(assumptions.llmCacheTargetPct) || 0) / 100;
        const llmRouteShareRatio = (Number(assumptions.llmBatchRoutePct) || 0) / 100;
        const llmRowNotes = [];

        const serviceAgg = Object.create(null);

        for (const raw of parsed.rows) {
          let cost = NaN;
          let billedCost = NaN;
          let service = '';
          let provider = '';
          let resource = '';
          let region = '';
          let dateStr = '';
          let rowClass = 'active_baseline';
          let detailNote = '';

          if (schema.id === 'AWS_CUR') {
            cost = parseNumericValue(raw[map.cost]);
            billedCost = cost;
            provider = 'AWS';
            service = raw[map.service] || 'Unknown AWS Service';
            const usageType = raw[map.usageType] || '';
            const op = raw[map.operation] || '';
            const liType = raw[map.lineItemType] || '';
            const term = raw[map.pricingTerm] || '';
            resource = raw[map.resourceId] || usageType || '—';
            region = raw[map.region] || 'global';
            dateStr = raw[map.date] || '';

            if (!Number.isFinite(cost)) {
              skippedRows.push({ row: raw.__rowIndex, reason: 'Invalid cost in ' + map.cost });
              continue;
            }

            const combined = (resource + ' ' + usageType + ' ' + op).toLowerCase();
            if (cost < 0 || /credit|refund|rifee/i.test(liType)) {
              rowClass = 'credit_refund';
              detailNote = (liType || 'Credit/Refund') + ' (included in net spend, excluded from savings)';
            } else if (term.toLowerCase() === 'unused' || /unused/i.test(combined)) {
              rowClass = 'unused_commitment';
              confirmedUnusedCommitment += cost;
              baseIdleAndUnused += cost;
              detailNote = 'Unused Savings Plan or reservation';
            } else if (/savingsplan|reserved/i.test(term) || /savingsplancovered|discountedusage/i.test(liType)) {
              rowClass = 'committed_used';
              detailNote = 'Covered by commitment (' + (term || liType) + ')';
            } else if (/unattached|orphan|idle/i.test(combined) || /volumeusage\.gp2|snapshotusage/i.test(usageType)) {
              rowClass = 'idle_storage';
              confirmedIdleStorage += cost;
              baseIdleAndUnused += cost;
              detailNote = usageType;
            } else if (/natgateway-bytes|datatransfer-out/i.test(usageType) || (/cloudwatch/i.test(service) && /dataprocessing|ingest|logs/i.test(combined))) {
              rowClass = 'network_logs';
              baseNetworkAndLogs += cost;
              detailNote = usageType;
            } else if ((!term || /ondemand/i.test(term)) && /ec2|rds|eks|ecs|fargate|redshift|elasticache|lambda/i.test(service) && /boxusage|instanceusage|nodeusage|vcpu|compute/i.test(usageType)) {
              rowClass = 'ondemand_compute';
              baseOnDemandCompute += cost;
              detailNote = usageType + ' (On-Demand)';
            } else {
              rowClass = 'active_baseline';
              detailNote = usageType || 'Active infrastructure';
            }
          } else if (schema.id === 'FOCUS_1_0') {
            const eff = map.effectiveCost ? parseNumericValue(raw[map.effectiveCost]) : NaN;
            const bill = map.billedCost ? parseNumericValue(raw[map.billedCost]) : NaN;
            cost = Number.isFinite(eff) ? eff : bill;
            billedCost = Number.isFinite(bill) ? bill : eff;
            if (!Number.isFinite(cost) && !Number.isFinite(billedCost)) {
              skippedRows.push({ row: raw.__rowIndex, reason: 'Invalid EffectiveCost and BilledCost' });
              continue;
            }
            if (!Number.isFinite(cost)) cost = 0;
            if (!Number.isFinite(billedCost)) billedCost = cost;

            provider = raw[map.provider] || 'Cloud';
            service = provider + ' · ' + (raw[map.service] || 'Unknown Service');
            const svcCat = raw[map.serviceCategory] || '';
            const chargeCat = raw[map.chargeCategory] || '';
            const pricingCat = raw[map.pricingCategory] || '';
            const commitStatus = raw[map.commitmentStatus] || '';
            resource = raw[map.resourceName] || raw[map.resourceId] || '—';
            region = raw[map.region] || 'global';
            dateStr = raw[map.dateStart] || '';

            const combined = ((raw[map.resourceId] || '') + ' ' + (raw[map.resourceName] || '') + ' ' + svcCat).toLowerCase();
            if (cost < 0 || /credit|adjustment/i.test(chargeCat)) {
              rowClass = 'credit_refund';
              detailNote = 'FOCUS ' + (chargeCat || 'Credit') + ' (excluded from savings)';
            } else if (/purchase/i.test(chargeCat) && cost === 0) {
              rowClass = 'commitment_purchase_amortized';
              detailNote = 'FOCUS Purchase (Billed ' + formatUsd(billedCost) + ', Effective $0.00)';
            } else if (/unused/i.test(commitStatus)) {
              rowClass = 'unused_commitment';
              confirmedUnusedCommitment += cost;
              baseIdleAndUnused += cost;
              detailNote = 'CommitmentDiscountStatus = Unused';
            } else if (/committed/i.test(pricingCat) || /^used$/i.test(commitStatus)) {
              rowClass = 'committed_used';
              detailNote = 'PricingCategory = Committed (Used)';
            } else if (/unattached|orphan|idle|snapshot|gp2/i.test(combined)) {
              rowClass = 'idle_storage';
              confirmedIdleStorage += cost;
              baseIdleAndUnused += cost;
              detailNote = 'Detached disk or archived storage';
            } else if (/networking|observability/i.test(svcCat) || /nat|logging|cloudwatch/i.test(service)) {
              rowClass = 'network_logs';
              baseNetworkAndLogs += cost;
              detailNote = svcCat || service;
            } else if (/compute|databases/i.test(svcCat) && (!pricingCat || /standard|ondemand/i.test(pricingCat))) {
              rowClass = 'ondemand_compute';
              baseOnDemandCompute += cost;
              detailNote = svcCat + ' · Standard (On-Demand)';
            } else {
              rowClass = 'active_baseline';
              detailNote = svcCat || 'Active usage';
            }
          } else if (schema.id === 'LLM_USAGE') {
            cost = parseNumericValue(raw[map.cost]);
            billedCost = cost;
            if (!Number.isFinite(cost)) {
              skippedRows.push({ row: raw.__rowIndex, reason: 'Invalid cost in ' + map.cost });
              continue;
            }
            const model = raw[map.model] || 'unknown-model';
            provider = raw[map.provider] || (/claude/i.test(model) ? 'Anthropic' : 'OpenAI');
            service = provider + ' · ' + model;
            resource = raw[map.project] || 'default-project';
            region = 'API';
            dateStr = raw[map.date] || '';
            rowClass = 'llm_usage';

            const inputRaw = map.inputTokens ? (parseNumericValue(raw[map.inputTokens]) || 0) : 0;
            let cachedTokens = 0;
            let totalInput = inputRaw;
            if (map.anthropicCacheReadTokens && raw[map.anthropicCacheReadTokens] !== '') {
              cachedTokens = parseNumericValue(raw[map.anthropicCacheReadTokens]) || 0;
              totalInput = inputRaw + cachedTokens;
            } else if (map.cachedInputTokens) {
              cachedTokens = Math.min(parseNumericValue(raw[map.cachedInputTokens]) || 0, inputRaw);
              totalInput = inputRaw;
            }
            const outputTokens = map.outputTokens ? (parseNumericValue(raw[map.outputTokens]) || 0) : 0;
            const cacheRatio = totalInput > 0 ? cachedTokens / totalInput : 0;
            const isBatch = map.batch ? /^(true|1|yes|batch)$/i.test(String(raw[map.batch] || '').trim()) : false;
            const isFlagship = /(gpt-4o(?!-mini)|gpt-4\.1(?!-mini|-nano)|gpt-5(?!-mini|-nano)|claude-3-7-sonnet|claude-3-5-sonnet|claude-4|claude-opus|\bo1\b|\bo3\b(?!-mini))/i.test(model);

            let rowCacheSav = 0;
            if (cost > 0 && cacheRatio < llmCacheTargetRatio && totalInput > 0) {
              baseLlmCacheEligible += cost;
              const inputWeight = (totalInput + 4 * outputTokens) > 0
                ? totalInput / (totalInput + 4 * outputTokens)
                : 0.7;
              const deltaCache = Math.max(0, llmCacheTargetRatio - cacheRatio);
              rowCacheSav = cost * inputWeight * deltaCache * 0.65;
              estLlmCacheSavings += rowCacheSav;
            }

            let rowRouteSav = 0;
            if (cost > 0 && isFlagship && !isBatch) {
              baseLlmRouteEligible += cost;
              const residualCost = Math.max(0, cost - rowCacheSav);
              rowRouteSav = residualCost * llmRouteShareRatio * 0.50;
              estLlmRouteSavings += rowRouteSav;
            }

            detailNote = 'Cached input: ' + (cacheRatio * 100).toFixed(0) + '% · ' + (isBatch ? 'Batch' : 'Sync') + (isFlagship ? ' · Flagship' : ' · Compact');
            llmRowNotes.push({ model, project: resource, cost, cacheRatio, isBatch, isFlagship, rowCacheSav, rowRouteSav });
          } else {
            // GENERIC_CSV
            cost = parseNumericValue(raw[map.cost]);
            billedCost = cost;
            if (!Number.isFinite(cost)) {
              skippedRows.push({ row: raw.__rowIndex, reason: 'Invalid cost in ' + map.cost });
              continue;
            }
            provider = map.provider ? (raw[map.provider] || 'Cloud') : 'Cloud';
            service = raw[map.service] || 'Unknown';
            resource = map.resourceId ? (raw[map.resourceId] || '—') : '—';
            region = map.region ? (raw[map.region] || '—') : '—';
            dateStr = map.date ? (raw[map.date] || '') : '';
            const term = map.pricingTerm ? (raw[map.pricingTerm] || '') : '';
            const combined = (service + ' ' + resource + ' ' + term).toLowerCase();

            if (cost < 0) {
              rowClass = 'credit_refund';
              detailNote = 'Credit or refund';
            } else if (/unused/i.test(combined)) {
              rowClass = 'unused_commitment';
              confirmedUnusedCommitment += cost;
              baseIdleAndUnused += cost;
            } else if (/unattached|idle|snapshot|gp2/i.test(combined)) {
              rowClass = 'idle_storage';
              confirmedIdleStorage += cost;
              baseIdleAndUnused += cost;
            } else if (/nat|cloudwatch|logging/i.test(combined)) {
              rowClass = 'network_logs';
              baseNetworkAndLogs += cost;
            } else if (/ec2|rds|compute|sql|vm/i.test(combined) && !/committed|reserved|savingsplan/i.test(combined)) {
              rowClass = 'ondemand_compute';
              baseOnDemandCompute += cost;
            } else {
              rowClass = 'active_baseline';
            }
            detailNote = term || 'Generic billing row';
          }

          confirmedEffectiveTotal += cost;
          confirmedBilledTotal += billedCost;
          if (dateStr) dates.push(dateStr.slice(0, 10));
          if (schema.id === 'FOCUS_1_0' && map.dateEnd && raw[map.dateEnd]) dates.push(raw[map.dateEnd].slice(0, 10));

          if (!serviceAgg[service]) {
            serviceAgg[service] = { service, count: 0, effectiveCost: 0, billedCost: 0 };
          }
          serviceAgg[service].count += 1;
          serviceAgg[service].effectiveCost += cost;
          serviceAgg[service].billedCost += billedCost;

          normalizedRows.push({
            rowIndex: raw.__rowIndex,
            date: dateStr ? dateStr.slice(0, 10) : '—',
            provider,
            service,
            resource,
            region,
            rowClass,
            detailNote,
            effectiveCost: roundCents(cost),
            billedCost: roundCents(billedCost)
          });
        }

        if (normalizedRows.length === 0) {
          return {
            error: 'No rows contain a valid numeric cost. Check the cost column and try again.',
            fingerprint,
            filename,
            skippedRows
          };
        }

        confirmedEffectiveTotal = roundCents(confirmedEffectiveTotal);
        confirmedBilledTotal = roundCents(confirmedBilledTotal);
        baseOnDemandCompute = roundCents(baseOnDemandCompute);
        baseIdleAndUnused = roundCents(baseIdleAndUnused);
        baseNetworkAndLogs = roundCents(baseNetworkAndLogs);
        baseLlmCacheEligible = roundCents(baseLlmCacheEligible);
        baseLlmRouteEligible = roundCents(baseLlmRouteEligible);

        const spRate = (Number(assumptions.computeSpDiscountPct) || 0) / 100;
        const idleRate = (Number(assumptions.idleCleanupPct) || 0) / 100;
        const netRate = (Number(assumptions.networkLogOptPct) || 0) / 100;

        const estSpMonthly = roundCents(baseOnDemandCompute * spRate);
        const estIdleMonthly = roundCents(baseIdleAndUnused * idleRate);
        const estNetMonthly = roundCents(baseNetworkAndLogs * netRate);
        const estCacheMonthly = roundCents(estLlmCacheSavings);
        const estRouteMonthly = roundCents(estLlmRouteSavings);

        const levers = [
          {
            id: 'compute_sp',
            window: '0–30 days',
            title: 'Cover steady compute with commitments',
            confirmedBase: baseOnDemandCompute,
            assumptionLabel: assumptions.computeSpDiscountPct + '% commitment discount',
            formula: baseOnDemandCompute > 0
              ? formatUsd(baseOnDemandCompute) + ' × ' + assumptions.computeSpDiscountPct + '%'
              : 'No eligible spend',
            monthlyEstimate: estSpMonthly,
            annualEstimate: roundCents(estSpMonthly * 12),
            active: baseOnDemandCompute > 0,
            verificationCheck: 'Check 30 days of CPU and memory usage before committing to a one-year plan.'
          },
          {
            id: 'idle_unused',
            window: '0–30 days',
            title: 'Reclaim idle storage and unused commitments',
            confirmedBase: baseIdleAndUnused,
            assumptionLabel: assumptions.idleCleanupPct + '% recoverable',
            formula: baseIdleAndUnused > 0
              ? formatUsd(baseIdleAndUnused) + ' × ' + assumptions.idleCleanupPct + '%'
              : 'No eligible spend',
            monthlyEstimate: estIdleMonthly,
            annualEstimate: roundCents(estIdleMonthly * 12),
            active: baseIdleAndUnused > 0,
            verificationCheck: 'Confirm disk and snapshot dependencies with the service owner before removal.'
          },
          {
            id: 'network_logs',
            window: '30–60 days',
            title: 'Reduce network and log ingestion costs',
            confirmedBase: baseNetworkAndLogs,
            assumptionLabel: assumptions.networkLogOptPct + '% reduction in traffic and logs',
            formula: baseNetworkAndLogs > 0
              ? formatUsd(baseNetworkAndLogs) + ' × ' + assumptions.networkLogOptPct + '%'
              : 'No eligible spend',
            monthlyEstimate: estNetMonthly,
            annualEstimate: roundCents(estNetMonthly * 12),
            active: baseNetworkAndLogs > 0,
            verificationCheck: 'Check VPC flow logs for endpoint traffic and confirm retention requirements.'
          },
          {
            id: 'llm_caching',
            window: '0–30 days',
            title: 'Cache repeated model inputs',
            confirmedBase: baseLlmCacheEligible,
            assumptionLabel: 'Target ' + assumptions.llmCacheTargetPct + '% cached input (65% assumed discount)',
            formula: baseLlmCacheEligible > 0
              ? 'Σ(cost × weight_in × max(0, ' + assumptions.llmCacheTargetPct + '% − fact_cache) × 65%)'
              : 'No eligible spend',
            monthlyEstimate: estCacheMonthly,
            annualEstimate: roundCents(estCacheMonthly * 12),
            active: baseLlmCacheEligible > 0,
            verificationCheck: 'Test a stable prompt prefix and measure the cache hit rate on representative requests.'
          },
          {
            id: 'llm_routing_batch',
            window: '30–90 days',
            title: 'Route eligible requests to batch or smaller models',
            confirmedBase: baseLlmRouteEligible,
            assumptionLabel: assumptions.llmBatchRoutePct + '% of residual cost at 50% discount',
            formula: baseLlmRouteEligible > 0
              ? 'Σ((cost − cache_est) × ' + assumptions.llmBatchRoutePct + '% × 50%)'
              : 'No eligible spend',
            monthlyEstimate: estRouteMonthly,
            annualEstimate: roundCents(estRouteMonthly * 12),
            active: baseLlmRouteEligible > 0,
            verificationCheck: 'Check response quality and confirm that batch latency meets the service target.'
          }
        ];

        // Confirmed unique eligible base (avoiding double-counting overlapping LLM rows)
        let confirmedEligibleUniqueBase = roundCents(baseOnDemandCompute + baseIdleAndUnused + baseNetworkAndLogs);
        if (schema.id === 'LLM_USAGE') {
          const llmUnique = llmRowNotes.reduce((acc, r) => {
            const eligCache = r.cacheRatio < llmCacheTargetRatio;
            const eligRoute = r.isFlagship && !r.isBatch;
            return acc + ((r.cost > 0 && (eligCache || eligRoute)) ? r.cost : 0);
          }, 0);
          confirmedEligibleUniqueBase = roundCents(confirmedEligibleUniqueBase + llmUnique);
        }

        const totalEstMonthly = roundCents(levers.reduce((sum, l) => sum + l.monthlyEstimate, 0));
        const totalEstAnnual = roundCents(levers.reduce((sum, l) => sum + l.annualEstimate, 0));
        const savingsSharePct = confirmedEffectiveTotal > 0 ? (totalEstMonthly / confirmedEffectiveTotal) * 100 : 0;

        const services = Object.values(serviceAgg)
          .map((s) => ({
            service: s.service,
            count: s.count,
            effectiveCost: roundCents(s.effectiveCost),
            billedCost: roundCents(s.billedCost),
            sharePct: confirmedEffectiveTotal > 0 ? (s.effectiveCost / confirmedEffectiveTotal) * 100 : 0
          }))
          .sort((a, b) => b.effectiveCost - a.effectiveCost);

        dates.sort();
        const periodLabel = dates.length > 0
          ? (dates[0] === dates[dates.length - 1] ? dates[0] : dates[0] + ' .. ' + dates[dates.length - 1])
          : 'Period unavailable';

        const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now();

        return {
          error: null,
          meta: {
            filename: filename || 'uploaded.csv',
            schemaId: schema.id,
            schemaLabel: schema.label,
            delimiter: parsed.delimiter,
            fingerprint,
            periodLabel,
            generatedAtIso: new Date().toISOString(),
            elapsedMs: Math.max(0.1, Number((t1 - t0).toFixed(1))),
            validRowCount: normalizedRows.length,
            skippedRowCount: skippedRows.length,
            columnMap: schema.columnMap,
            headers: parsed.headers
          },
          confirmed: {
            effectiveTotal: confirmedEffectiveTotal,
            billedTotal: confirmedBilledTotal,
            hasSeparateBilledCost: schema.id === 'FOCUS_1_0' && Boolean(map.billedCost && map.effectiveCost),
            eligibleBaseTotal: confirmedEligibleUniqueBase,
            eligibleBaseSharePct: confirmedEffectiveTotal > 0 ? (confirmedEligibleUniqueBase / confirmedEffectiveTotal) * 100 : 0,
            unusedCommitmentTotal: roundCents(confirmedUnusedCommitment),
            idleStorageTotal: roundCents(confirmedIdleStorage),
            services,
            rows: normalizedRows,
            skippedRows
          },
          assumptions: Object.assign({}, assumptions),
          estimated: {
            monthlyTotal: totalEstMonthly,
            annualTotal: totalEstAnnual,
            savingsSharePct: Number(savingsSharePct.toFixed(2)),
            levers
          }
        };
      }

      // Expose deterministic engine for automated E2E / unit verification
      window.FinOpsGuardEngine = {
        DEMO_DATASETS,
        SCENARIO_PRESETS,
        parseCsv,
        detectSchema,
        analyzeBillingCsv,
        computeFingerprint,
        formatUsd
      };

      /* =====================================================================
         3. APPLICATION STATE & UI CONTROLLER
         ===================================================================== */
      const $ = id => document.getElementById(id);
      const aliases = {aws:'aws_cur', focus:'focus_1_0', llm:'llm_usage'};
      const inputs = [
        ['SpDiscount','computeSpDiscountPct','One-year commitment discount',45,'On-demand compute and managed databases.'],
        ['IdleCleanup','idleCleanupPct','Recoverable idle spend',100,'Potential idle storage and unused commitments.'],
        ['NetworkOpt','networkLogOptPct','Network and logging reduction',75,'Eligible transmission and log ingestion.'],
        ['LlmCache','llmCacheTargetPct','Target cached input',85,'Incremental input caching at an assumed 65% discount.'],
        ['LlmRoute','llmBatchRoutePct','Share routed to batch or smaller models',60,'Eligible spend after caching, at an assumed 50% discount.']
      ];
      const state = {preset:null, scenario:'base', assumptions:{...SCENARIO_PRESETS.base}, csv:'', filename:'',
        report:null, previous:null, sourceVersion:0};
      const buttons = selector => Array.from(document.querySelectorAll(selector));
      const usd = value => escapeHtml(formatUsd(value));
      const numberCell = value => '<td class="num">'+usd(value)+'</td>';
      function text(id,value) { $(id).textContent=value; }

      function setStep(step, moveFocus=true) {
        if (!state.report && step !== 1) step=1;
        [1,2,3].forEach(n=>$('stepBtn'+n).setAttribute('aria-current', n===step?'step':'false'));
        $('viewWorkbench').classList.toggle('is-hidden-view',step===3);
        $('viewPrintPlan').classList.toggle('is-hidden-view',step!==3);
        if (moveFocus) {
          const target=step===3?$('viewPrintPlan'):$(step===2?'sectionAnalysis':'sectionImport');
          target.focus({preventScroll:true});
          if(step===2) target.scrollIntoView({block:'start'});
          else window.scrollTo(0,0);
        }
      }
      function linkStep() {
        return ({'#plan':3,'#step3':3,'#viewPrintPlan':3,'#analysis':2,'#step2':2,'#sectionAnalysis':2})[location.hash] || 1;
      }
      function navigate(step) {
        const url=new URL(location.href);
        url.hash=['','#source','#analysis','#plan'][step];
        if (url.href!==location.href) history.pushState(null,'',url);
        setStep(step);
      }
      function progress(kind, message, timing='', error=false, pct=100) {
        const strip=$(kind+'ProgressStrip');
        strip.hidden=false;
        strip.classList.toggle('is-error',error);
        text(kind+'ProgressLabel',message);
        text(kind+'ProgressTiming',timing);
        $(kind+'ProgressFill').style.width=pct+'%';
      }
      function setValid(valid) {
        document.body.dataset.valid=String(valid);
        $('auditResults').hidden=!valid;
        $('sectionAnalysis').hidden=!valid;
        for(const id of ['formulaDrawer','rowsDrawer','diagnosticsDrawer']) $(id).hidden=!valid;
        ['stepBtn2','stepBtn3'].forEach(id=>$(id).disabled=!valid);
        if(!valid) setStep(1,false);
      }
      function syncControls() {
        for(const b of buttons('[data-preset]')) b.setAttribute('aria-pressed',String(b.dataset.preset===state.preset));
        for(const b of buttons('[data-scenario]')) b.setAttribute('aria-pressed',String(b.dataset.scenario===state.scenario));
        for(const [suffix,key] of inputs) {
          $('rng'+suffix).value=state.assumptions[key];
          $('inp'+suffix).value=state.assumptions[key];
        }
      }
      function renderPlan(r) {
        text('printSyncStatus',r.meta.filename+' · '+r.assumptions.name+' scenario');
        text('printGeneratedAt','Calculated '+r.meta.generatedAtIso.slice(0,19).replace('T',' ')+' UTC');
        const meta=[['Format',r.meta.schemaLabel],['Input dates',r.meta.periodLabel]];
        $('printMetaGrid').innerHTML=meta.map(([a,b])=>'<div><dt>'+a+'</dt><dd>'+escapeHtml(b)+'</dd></div>').join('');
        text('printConfirmedTotal',formatUsd(r.confirmed.effectiveTotal));
        text('printConfirmedDetail',r.meta.validRowCount+' rows · '+formatUsd(r.confirmed.eligibleBaseTotal)+' eligible');
        text('printEstimatedTotal',formatUsd(r.estimated.monthlyTotal));
        text('printEstimatedDetail',formatUsd(r.estimated.annualTotal)+' over 12 equivalent billing months');
        $('printServicesBody').innerHTML=r.confirmed.services.map(s=>'<tr><td>'+escapeHtml(s.service)+'</td><td class="num">'+s.count+'</td><td class="num">'+formatPct(s.sharePct)+'</td>'+numberCell(s.effectiveCost)+'</tr>').join('');
        $('printServicesFoot').innerHTML='<tr><td>Total</td><td class="num">'+r.meta.validRowCount+'</td><td></td>'+numberCell(r.confirmed.effectiveTotal)+'</tr>';
        text('printScenarioBadge',r.assumptions.name+' scenario. Estimates assume that the export represents one billing month.');
        $('printAssumptionsBody').innerHTML=inputs.map(([,key,label,,usage])=>'<tr><td>'+label+'</td><td class="num">'+r.assumptions[key]+'%</td><td>'+usage+'</td></tr>').join('');
        $('printPlanBody').innerHTML=r.estimated.levers.filter(l=>l.active).map(l=>'<tr><td>'+escapeHtml(l.window)+'</td><td><strong>'+escapeHtml(l.title)+'</strong><small>'+escapeHtml(l.formula)+'</small></td>'+numberCell(l.confirmedBase)+numberCell(l.monthlyEstimate)+numberCell(l.annualEstimate)+'<td>'+escapeHtml(l.verificationCheck)+'</td></tr>').join('') ||
          '<tr><td colspan="6">No eligible costs found for the current model.</td></tr>';
        $('printPlanFoot').innerHTML='<tr><td colspan="2">Total</td>'+numberCell(r.confirmed.eligibleBaseTotal)+numberCell(r.estimated.monthlyTotal)+numberCell(r.estimated.annualTotal)+'<td></td></tr>';
        text('printIntegrityBox',r.meta.validRowCount+' valid rows · '+r.meta.skippedRowCount+' skipped. '+(r.confirmed.hasSeparateBilledCost?'Total billed cost '+formatUsd(r.confirmed.billedTotal)+'. ':'')+'The report was calculated locally.');
        text('printFooterChecksum','Input fingerprint '+r.meta.fingerprint+' · '+r.meta.filename);
      }
      function render(r) {
        const {meta,confirmed,estimated}=r;
        const src=state.preset?'Sample':'Your CSV';
        text('sourceSummary',src+' · '+meta.filename);
        text('kpiEstMonthly',formatUsd(estimated.monthlyTotal));
        text('kpiEstMonthlySub',(confirmed.effectiveTotal>0?formatPct(estimated.savingsSharePct)+' of confirmed spend · ':'')+r.assumptions.name+' scenario');
        text('kpiConfirmedTotal',formatUsd(confirmed.effectiveTotal));
        const projected=roundCents(confirmed.effectiveTotal-estimated.monthlyTotal);
        text('projectedSpend',formatUsd(projected));
        const graphValid=confirmed.effectiveTotal>0 && projected>=0;
        $('beforeBar').parentElement.hidden=$('afterBar').parentElement.hidden=!graphValid;
        $('beforeBar').style.width='100%';
        $('afterBar').style.width=(graphValid?Math.min(100,100*projected/confirmed.effectiveTotal):0)+'%';
        const best=estimated.levers.reduce((top,lever)=>lever.monthlyEstimate>0 && (!top || lever.monthlyEstimate>top.monthlyEstimate)?lever:top,null);
        text('topLeverTitle',best?best.title:'No qualifying opportunity');
        text('topLeverAmount',best?formatUsd(best.monthlyEstimate):'');
        $('topLeverUnit').hidden=!best;
        text('topLeverCheck',best?best.verificationCheck:'Review the source rows and assumptions. The current model found no positive savings estimate.');
        text('kpiConfirmedSub',meta.validRowCount+' source rows');
        text('kpiEligibleBase',formatUsd(confirmed.eligibleBaseTotal));
        text('kpiEstAnnual',formatUsd(estimated.annualTotal));
        $('serviceBreakdownList').innerHTML=confirmed.services.map(s=>'<div class="service"><span class="name">'+escapeHtml(s.service)+'</span><span class="service-track" aria-hidden="true"><i style="width:'+Math.max(0,Math.min(100,s.sharePct))+'%"></i></span><span class="value">'+usd(s.effectiveCost)+'</span></div>').join('');
        $('focusReconciliationNote').hidden=!confirmed.hasSeparateBilledCost;
        text('focusReconciliationNote','Effective cost '+formatUsd(confirmed.effectiveTotal)+' · Billed cost '+formatUsd(confirmed.billedTotal)+'. The model uses effective costs to account for commitments once.');
        $('leversTableBody').innerHTML=estimated.levers.map(l=>'<tr><td><strong>'+escapeHtml(l.title)+'</strong><small>'+escapeHtml(l.formula)+'</small><small>'+escapeHtml(l.verificationCheck)+'</small></td>'+numberCell(l.confirmedBase)+numberCell(l.monthlyEstimate)+numberCell(l.annualEstimate)+'</tr>').join('');
        $('leversTableFoot').innerHTML='<tr><td>Total · unique eligible costs</td>'+numberCell(confirmed.eligibleBaseTotal)+numberCell(estimated.monthlyTotal)+numberCell(estimated.annualTotal)+'</tr>';
        text('rowsDrawerCount',meta.validRowCount);
        $('rawRowsTableBody').innerHTML=confirmed.rows.map(row=>'<tr><td>'+escapeHtml(row.service)+'<small>'+escapeHtml(row.region)+' · '+escapeHtml(row.date)+'</small></td><td>'+escapeHtml(row.resource)+'<small>'+escapeHtml(row.detailNote)+'</small></td><td>'+escapeHtml(CLASS_LABELS[row.rowClass]?.text || row.rowClass)+'</td>'+numberCell(row.effectiveCost)+'</tr>').join('');
        const cols=Object.entries(meta.columnMap).filter(([,column])=>column);
        $('diagnosticsBody').innerHTML='<p>'+escapeHtml(meta.schemaLabel)+' · '+meta.validRowCount+' valid rows · '+meta.skippedRowCount+' skipped · '+meta.elapsedMs+' ms</p><p>Input fingerprint <code>'+escapeHtml(meta.fingerprint)+'</code></p><ul>'+cols.map(([field,column])=>'<li>'+escapeHtml(field)+' ← '+escapeHtml(column)+'</li>').join('')+'</ul>';
        $('deltaBar').hidden=!state.previous;
        if(state.previous) {
          text('deltaPrevName',state.previous.meta.filename);
          text('deltaMetrics','Spend '+formatSignedUsd(confirmed.effectiveTotal-state.previous.confirmed.effectiveTotal)+' · Monthly estimate '+formatSignedUsd(estimated.monthlyTotal-state.previous.estimated.monthlyTotal));
        }
        renderPlan(r);
      }
      function audit(csv,filename,{preset=null,notify=true}={}) {
        const result=analyzeBillingCsv(csv,filename,state.assumptions);
        state.sourceVersion++;
        state.csv=csv; state.filename=filename; state.preset=preset;
        $('rawCsvTextarea').value=csv;
        $('btnDownloadCurrentCsv').disabled=!csv;
        if(result.error) {
          if(state.report) state.previous=state.report;
          state.report=null;
          setValid(false); syncControls();
          text('sourceSummary',filename);
          text('editStatus',result.error);
          progress('import',filename+' · '+result.error,'',true);
          return;
        }
        if(state.report && state.report.meta.fingerprint!==result.meta.fingerprint) state.previous=state.report;
        state.report=result;
        syncControls();setValid(true);render(result);
        text('editStatus','');
        $('exportProgressStrip').hidden=true;
        if(notify) progress('import',result.meta.validRowCount+' rows analyzed'+(result.meta.skippedRowCount?' · '+result.meta.skippedRowCount+' skipped':'')+'.',result.meta.elapsedMs+' ms');
        else $('importProgressStrip').hidden=true;
      }
      function loadSample(key,notify=true) {
        const sample=DEMO_DATASETS[key];
        if(!sample)return;
        audit(sample.csv,sample.filename,{preset:key,notify});
      }
      function upload(file) {
        if(!file)return;
        const version=++state.sourceVersion;
        if(state.report) state.previous=state.report;
        state.report=null;
        setValid(false);
        const reader=new FileReader();
        progress('import','Reading '+file.name+'…','',false,0);
        reader.onprogress=e=>{if(version===state.sourceVersion && e.lengthComputable) progress('import','Reading '+file.name+'…',Math.round(e.loaded/e.total*100)+'%',false,e.loaded/e.total*100);};
        reader.onload=()=>{if(version===state.sourceVersion)audit(String(reader.result || ''),file.name);};
        reader.onerror=()=>{if(version===state.sourceVersion){audit('',file.name);progress('import','Could not read '+file.name+'. Select the file to retry.','',true);}};
        reader.readAsText(file);
      }
      function download(filename,type,contents) {
        const a=document.createElement('a'), url=URL.createObjectURL(new Blob([contents],{type}));
        a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();
        setTimeout(()=>URL.revokeObjectURL(url),1000);
      }
      function downloadPlan(type) {
        const r=state.report;
        if(!r)return;
        const fp=r.meta.fingerprint.slice(0,8).toLowerCase();
        if(type==='json') {
          download('finopsguard-audit-'+fp+'.json','application/json;charset=utf-8',JSON.stringify(r,null,2));
          progress('export','Audit JSON prepared for download.');
        } else {
          const lines=['window,lever_id,title,confirmed_base_usd_fact,formula,monthly_savings_estimate_usd,annual_savings_estimate_usd,required_engineering_check'];
          const quote=v=>'"'+String(v).replace(/"/g,'""')+'"';
          for(const l of r.estimated.levers) lines.push([quote(l.window),quote(l.id),quote(l.title),l.confirmedBase.toFixed(2),quote(l.formula),l.monthlyEstimate.toFixed(2),l.annualEstimate.toFixed(2),quote(l.verificationCheck)].join(','));
          download('finopsguard-plan-'+fp+'.csv','text/csv;charset=utf-8',lines.join('\n'));
          progress('export','Action CSV prepared for download.');
        }
      }
      $('assumptionsInputs').innerHTML=inputs.map(([suffix,key,label,max])=>'<div class="input-row"><label for="inp'+suffix+'">'+label+' (%)</label><input type="range" id="rng'+suffix+'" min="0" max="'+max+'" aria-label="'+label+' in percent"><input type="number" id="inp'+suffix+'" min="0" max="'+max+'" step="1"></div>').join('');
      for(const [suffix,key,,max] of inputs) {
        const adjust=value=>{
          if(!state.report)return;
          state.scenario='custom';
          state.assumptions={...state.assumptions,name:'Custom',[key]:Math.max(0,Math.min(max,Math.round(Number(value)||0)))};
          audit(state.csv,state.filename,{preset:state.preset,notify:false});
        };
        $('rng'+suffix).addEventListener('input',e=>adjust(e.target.value));
        $('inp'+suffix).addEventListener('change',e=>adjust(e.target.value));
      }
      for(const b of buttons('[data-scenario]')) b.addEventListener('click',()=>{
        if(!state.report)return;
        state.scenario=b.dataset.scenario;state.assumptions={...SCENARIO_PRESETS[state.scenario]};
        audit(state.csv,state.filename,{preset:state.preset,notify:false});
      });
      for(const b of buttons('[data-preset]')) b.addEventListener('click',()=>loadSample(b.dataset.preset));
      $('btnLoadMutationA').addEventListener('click',()=>{loadSample('mutation_a');text('editStatus','Loaded the AWS commitment comparison.');});
      $('btnLoadMutationB').addEventListener('click',()=>{loadSample('mutation_b');text('editStatus','Loaded the LLM caching comparison.');});
      $('btnUploadCsv').addEventListener('click',()=>$('csvFileInput').click());
      $('csvFileInput').addEventListener('change',e=>{upload(e.target.files[0]);e.target.value='';});
      const zone=$('csvDropZone');
      ['dragover','dragenter'].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();zone.classList.add('is-dragover');}));
      ['dragleave','drop'].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();zone.classList.remove('is-dragover');}));
      zone.addEventListener('drop',e=>upload(e.dataTransfer.files[0]));
      $('rawCsvTextarea').addEventListener('input',e=>{
        if(state.report) state.previous=state.report;
        state.sourceVersion++;
        state.report=null; state.csv=e.target.value; state.preset=null;
        syncControls(); setValid(false);
        $('btnDownloadCurrentCsv').disabled=!state.csv;
        text('sourceSummary','Unapplied CSV edits');
        text('editStatus','Recalculate to update the audit and exports.');
      });
      $('btnApplyRawCsv').addEventListener('click',()=>{
        audit($('rawCsvTextarea').value,'edited_'+state.filename.replace(/^edited_/,''));
        if(state.report)text('editStatus','Recalculated '+state.report.meta.validRowCount+' rows. Monthly estimate '+formatUsd(state.report.estimated.monthlyTotal)+'.');
      });
      $('btnDownloadCurrentCsv').addEventListener('click',()=>download(state.filename,'text/csv;charset=utf-8',state.csv));
      ['stepBtn1','stepBtn2','stepBtn3'].forEach((id,index)=>$(id).addEventListener('click',()=>navigate(index+1)));
      $('btnGoToPrintTop').addEventListener('click',()=>navigate(3));
      $('btnBackToAnalysis').addEventListener('click',()=>navigate(2));
      $('btnTriggerPrint').addEventListener('click',()=>{if(state.report){progress('export','Print preview requested. Choose Save as PDF to keep a copy.');window.print();}});
      $('btnExportJson').addEventListener('click',()=>downloadPlan('json'));
      $('btnExportActionCsv').addEventListener('click',()=>downloadPlan('csv'));
      window.addEventListener('hashchange',()=>setStep(linkStep()));
      const requested=new URLSearchParams(location.search).get('sample');
      loadSample(Object.hasOwn(aliases,requested)?aliases[requested]:'aws_cur',false);
      setStep(linkStep(),Boolean(location.hash));
    })();
