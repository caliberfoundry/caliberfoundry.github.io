(function () {
      'use strict';

      /* =====================================================================
         1. EMBEDDED REAL-FORMAT DEMO & MUTATION CSV DATASETS (WORKS OFFLINE)
         ===================================================================== */
      const DEMO_DATASETS = {
        aws_cur: {
          key: 'aws_cur',
          filename: '01_aws_cur_baseline.csv',
          label: 'AWS CUR · SaaS Production (Ноябрь 2026)',
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
          label: 'Изменённый вход A · AWS CUR (SP + удалён EBS)',
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
          label: 'Изменённый вход B · LLM CSV (72% кэш + новый claude-3-7-sonnet)',
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
          name: 'Консервативный',
          computeSpDiscountPct: 18,
          idleCleanupPct: 50,
          networkLogOptPct: 20,
          llmCacheTargetPct: 30,
          llmBatchRoutePct: 15
        },
        base: {
          name: 'Базовый',
          computeSpDiscountPct: 24,
          idleCleanupPct: 70,
          networkLogOptPct: 35,
          llmCacheTargetPct: 45,
          llmBatchRoutePct: 25
        },
        aggressive: {
          name: 'Агрессивный',
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
          return { headers: [], rows: [], delimiter: ',', error: 'Файл CSV пуст.' };
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
        row.push(field.trim());
        if (row.some((cell) => cell !== '')) matrix.push(row);

        if (matrix.length < 2) {
          return { headers: matrix[0] || [], rows: [], delimiter, error: 'В CSV нет строк данных (найдена только строка заголовков).' };
        }

        const headers = matrix[0];
        const rows = [];
        for (let r = 1; r < matrix.length; r++) {
          const values = matrix[r];
          const obj = {};
          for (let c = 0; c < headers.length; c++) {
            obj[headers[c]] = values[c] !== undefined ? values[c] : '';
          }
          obj.__rowIndex = r + 1;
          rows.push(obj);
        }

        return { headers, rows, delimiter, error: null };
      }

      function buildHeaderLookup(headers) {
        const map = {};
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
            label: 'Табличный биллинг CSV (универсальный маппинг)',
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
          label: 'Нераспознанная схема CSV',
          columnMap: {}
        };
      }

      const CLASS_LABELS = {
        ondemand_compute: { text: 'Факт: On-Demand Compute/DB', badge: 'badge-fact' },
        committed_used: { text: 'Факт: Покрыто SP / Committed', badge: 'badge-neutral' },
        unused_commitment: { text: 'Факт: Неиспользованный SP/RI', badge: 'badge-waste' },
        idle_storage: { text: 'Факт: Отцепленное/архивное хранилище', badge: 'badge-waste' },
        network_logs: { text: 'Факт: NAT Bytes / Логи', badge: 'badge-fact' },
        active_baseline: { text: 'Факт: Активная база (без изменений)', badge: 'badge-neutral' },
        credit_refund: { text: 'Факт: Кредит / Возврат (исключено из базы)', badge: 'badge-neutral' },
        commitment_purchase_amortized: { text: 'FOCUS Purchase (Effective = $0)', badge: 'badge-neutral' },
        llm_usage: { text: 'Факт: LLM Token Billing', badge: 'badge-fact' }
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
            error: 'Не удалось распознать колонки стоимости и сервиса. Ожидаются заголовки AWS CUR (lineItem/UnblendedCost, lineItem/ProductCode), FOCUS 1.0 (EffectiveCost/BilledCost, ServiceName), OpenAI/Anthropic (model, cost_usd) или generic (service, cost).',
            fingerprint,
            filename,
            headers: parsed.headers
          };
        }

        const map = schema.columnMap;
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

        const serviceAgg = {};

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
              skippedRows.push({ row: raw.__rowIndex, reason: 'Нечисловая стоимость в ' + map.cost });
              continue;
            }

            const combined = (resource + ' ' + usageType + ' ' + op).toLowerCase();
            if (cost < 0 || /credit|refund|rifee/i.test(liType)) {
              rowClass = 'credit_refund';
              detailNote = (liType || 'Credit/Refund') + ' (учтено в итоговом факте, исключено из базы экономии)';
            } else if (term.toLowerCase() === 'unused' || /unused/i.test(combined)) {
              rowClass = 'unused_commitment';
              confirmedUnusedCommitment += cost;
              baseIdleAndUnused += cost;
              detailNote = 'Неиспользованный коммитмент Savings Plan / RI';
            } else if (/savingsplan|reserved/i.test(term) || /savingsplancovered|discountedusage/i.test(liType)) {
              rowClass = 'committed_used';
              detailNote = 'Уже покрыто коммитментом (' + (term || liType) + ')';
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
              detailNote = usageType || 'Активная инфраструктура';
            }
          } else if (schema.id === 'FOCUS_1_0') {
            const eff = map.effectiveCost ? parseNumericValue(raw[map.effectiveCost]) : NaN;
            const bill = map.billedCost ? parseNumericValue(raw[map.billedCost]) : NaN;
            cost = Number.isFinite(eff) ? eff : bill;
            billedCost = Number.isFinite(bill) ? bill : eff;
            if (!Number.isFinite(cost) && !Number.isFinite(billedCost)) {
              skippedRows.push({ row: raw.__rowIndex, reason: 'Нечисловые EffectiveCost/BilledCost' });
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
              detailNote = 'FOCUS ' + (chargeCat || 'Credit') + ' (исключено из базы экономии)';
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
              detailNote = 'Непривязанный диск / архив';
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
              detailNote = svcCat || 'Активное потребление';
            }
          } else if (schema.id === 'LLM_USAGE') {
            cost = parseNumericValue(raw[map.cost]);
            billedCost = cost;
            if (!Number.isFinite(cost)) {
              skippedRows.push({ row: raw.__rowIndex, reason: 'Нечисловая стоимость в ' + map.cost });
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

            detailNote = 'Кэш: ' + (cacheRatio * 100).toFixed(0) + '% · ' + (isBatch ? 'Batch' : 'Sync') + (isFlagship ? ' · Flagship' : ' · Compact');
            llmRowNotes.push({ model, project: resource, cost, cacheRatio, isBatch, isFlagship, rowCacheSav, rowRouteSav });
          } else {
            // GENERIC_CSV
            cost = parseNumericValue(raw[map.cost]);
            billedCost = cost;
            if (!Number.isFinite(cost)) {
              skippedRows.push({ row: raw.__rowIndex, reason: 'Нечисловая стоимость в ' + map.cost });
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
              detailNote = 'Кредит / возврат (исключено из базы экономии)';
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
            detailNote = term || 'Импортировано из generic CSV';
          }

          confirmedEffectiveTotal += cost;
          confirmedBilledTotal += billedCost;
          if (dateStr) dates.push(dateStr.slice(0, 10));

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
            error: 'Ни одна строка CSV не содержит валидной числовой суммы расходов.',
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
            window: '0–30 дн',
            title: 'Покрытие On-Demand Compute/DB через 1-Yr Savings Plans / CUD',
            confirmedBase: baseOnDemandCompute,
            assumptionLabel: assumptions.computeSpDiscountPct + '% скидка SP/CUD',
            formula: baseOnDemandCompute > 0
              ? formatUsd(baseOnDemandCompute) + ' × ' + assumptions.computeSpDiscountPct + '%'
              : 'База $0.00 (не применимо)',
            monthlyEstimate: estSpMonthly,
            annualEstimate: roundCents(estSpMonthly * 12),
            active: baseOnDemandCompute > 0,
            verificationCheck: 'Сверить стабильный baseline CPU/RAM за 30 дней и исключить сезонные пики перед покупкой 1-Yr No Upfront.'
          },
          {
            id: 'idle_unused',
            window: '0–30 дн',
            title: 'Очистка Idle Storage (gp2/снапшоты) и перераспределение Unused Commitments',
            confirmedBase: baseIdleAndUnused,
            assumptionLabel: assumptions.idleCleanupPct + '% возврат / очистка',
            formula: baseIdleAndUnused > 0
              ? formatUsd(baseIdleAndUnused) + ' × ' + assumptions.idleCleanupPct + '%'
              : 'База $0.00 (не применимо)',
            monthlyEstimate: estIdleMonthly,
            annualEstimate: roundCents(estIdleMonthly * 12),
            active: baseIdleAndUnused > 0,
            verificationCheck: 'Подтвердить с владельцами сервисов отсутствие зависимостей у unattached-томов и архивных снапшотов.'
          },
          {
            id: 'network_logs',
            window: '30–60 дн',
            title: 'VPC Gateway Endpoints для NAT Bytes и политики ретеншна логов',
            confirmedBase: baseNetworkAndLogs,
            assumptionLabel: assumptions.networkLogOptPct + '% снижение трафика/логов',
            formula: baseNetworkAndLogs > 0
              ? formatUsd(baseNetworkAndLogs) + ' × ' + assumptions.networkLogOptPct + '%'
              : 'База $0.00 (не применимо)',
            monthlyEstimate: estNetMonthly,
            annualEstimate: roundCents(estNetMonthly * 12),
            active: baseNetworkAndLogs > 0,
            verificationCheck: 'Проверить VPC Flow Logs (доля трафика в S3/ECR) и требования комплаенса по срокам хранения логов.'
          },
          {
            id: 'llm_caching',
            window: '0–30 дн',
            title: 'LLM Prompt Caching для повторяющегося системного контекста',
            confirmedBase: baseLlmCacheEligible,
            assumptionLabel: 'Цель ' + assumptions.llmCacheTargetPct + '% кэша (скидка 65%)',
            formula: baseLlmCacheEligible > 0
              ? 'Σ(cost × weight_in × max(0, ' + assumptions.llmCacheTargetPct + '% − fact_cache) × 65%)'
              : 'База $0.00 (не применимо)',
            monthlyEstimate: estCacheMonthly,
            annualEstimate: roundCents(estCacheMonthly * 12),
            active: baseLlmCacheEligible > 0,
            verificationCheck: 'Стабилизировать префикс системного промпта (>1024 токенов) и замерить реальный cache_read_ratio в staging.'
          },
          {
            id: 'llm_routing_batch',
            window: '30–90 дн',
            title: 'Перенос асинхронных/типовых LLM-вызовов в Batch API и компактные модели',
            confirmedBase: baseLlmRouteEligible,
            assumptionLabel: assumptions.llmBatchRoutePct + '% объёма × 50% скидка (от остатка)',
            formula: baseLlmRouteEligible > 0
              ? 'Σ((cost − cache_est) × ' + assumptions.llmBatchRoutePct + '% × 50%)'
              : 'База $0.00 (не применимо)',
            monthlyEstimate: estRouteMonthly,
            annualEstimate: roundCents(estRouteMonthly * 12),
            active: baseLlmRouteEligible > 0,
            verificationCheck: 'Прогнать eval-выборку качества ответов (accuracy/JSON-schema) и подтвердить допуск задержки 24ч для Batch.'
          }
        ];

        // Confirmed unique eligible base (avoiding double-counting overlapping LLM rows)
        let confirmedEligibleUniqueBase = roundCents(baseOnDemandCompute + baseIdleAndUnused + baseNetworkAndLogs);
        if (schema.id === 'LLM_USAGE') {
          const llmUnique = llmRowNotes.reduce((acc, r) => {
            const eligCache = r.cacheRatio < llmCacheTargetRatio;
            const eligRoute = r.isFlagship && !r.isBatch;
            return acc + ((eligCache || eligRoute) ? r.cost : 0);
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
          : 'Период не указан в CSV';

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
            hasSeparateBilledCost: schema.id === 'FOCUS_1_0',
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
      const state = {
        activeStep: 1,
        activePresetKey: 'aws_cur',
        activeScenarioKey: 'base',
        currentFilename: DEMO_DATASETS.aws_cur.filename,
        currentCsvText: DEMO_DATASETS.aws_cur.csv,
        assumptions: Object.assign({}, SCENARIO_PRESETS.base),
        report: null,
        previousReport: null
      };

      const $ = (id) => document.getElementById(id);

      function setStep(stepNum) {
        state.activeStep = stepNum;
        [1, 2, 3].forEach((n) => {
          const btn = $('stepBtn' + n);
          if (btn) btn.setAttribute('aria-current', n === stepNum ? 'step' : 'false');
        });

        const workbench = $('viewWorkbench');
        const printView = $('viewPrintPlan');
        if (stepNum === 3) {
          workbench.classList.add('is-hidden-view');
          printView.classList.remove('is-hidden-view');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          printView.classList.add('is-hidden-view');
          workbench.classList.remove('is-hidden-view');
          const target = stepNum === 1 ? $('sectionImport') : $('sectionAnalysis');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      function updateProgressStrip(stripId, labelId, timingId, fillId, status, text, timingText, pct) {
        const strip = $(stripId);
        strip.classList.remove('is-done', 'is-error', 'is-running');
        strip.classList.add(status);
        $(labelId).textContent = text;
        $(timingId).textContent = timingText;
        $(fillId).style.width = pct + '%';
      }

      function syncAssumptionControls() {
        const pairs = [
          ['SpDiscount', 'computeSpDiscountPct'],
          ['IdleCleanup', 'idleCleanupPct'],
          ['NetworkOpt', 'networkLogOptPct'],
          ['LlmCache', 'llmCacheTargetPct'],
          ['LlmRoute', 'llmBatchRoutePct']
        ];
        for (const [suffix, prop] of pairs) {
          const val = state.assumptions[prop];
          $('rng' + suffix).value = val;
          $('inp' + suffix).value = val;
          $('val' + suffix).textContent = val + '%';
        }
        ['conservative', 'base', 'aggressive'].forEach((key) => {
          const btn = $('scenarioBtn' + key.charAt(0).toUpperCase() + key.slice(1));
          if (btn) btn.setAttribute('aria-pressed', state.activeScenarioKey === key ? 'true' : 'false');
        });
      }

      function syncPresetButtons() {
        const map = { aws_cur: 'presetBtnAws', focus_1_0: 'presetBtnFocus', llm_usage: 'presetBtnLlm' };
        Object.entries(map).forEach(([key, id]) => {
          const btn = $(id);
          if (btn) btn.setAttribute('aria-pressed', state.activePresetKey === key ? 'true' : 'false');
        });
      }

      function renderDeltaBar(prev, curr) {
        const bar = $('deltaBar');
        if (!prev || !curr || prev.meta.fingerprint === curr.meta.fingerprint) {
          bar.classList.remove('visible');
          return;
        }
        const diffConfirmed = roundCents(curr.confirmed.effectiveTotal - prev.confirmed.effectiveTotal);
        const diffSavings = roundCents(curr.estimated.monthlyTotal - prev.estimated.monthlyTotal);
        $('deltaPrevName').textContent = prev.meta.filename;
        $('deltaNotice').textContent = 'Отпечаток входа изменён (' + prev.meta.fingerprint.slice(0, 8) + ' → ' + curr.meta.fingerprint.slice(0, 8) + '). Все итоги и печатный план пересчитаны.';
        $('deltaMetrics').innerHTML =
          '<span>Факт CSV: <strong>' + escapeHtml(formatSignedUsd(diffConfirmed)) + '</strong></span>' +
          '<span>Оценка экономии/мес: <strong>' + escapeHtml(formatSignedUsd(diffSavings)) + '</strong></span>' +
          '<span>Строк: <strong>' + prev.meta.validRowCount + ' → ' + curr.meta.validRowCount + '</strong></span>';
        bar.classList.add('visible');
      }

      function renderReport(report) {
        // Header meta chips
        $('heroSourceChip').textContent = 'Файл: ' + report.meta.filename;
        $('heroSchemaChip').textContent = 'Схема: ' + report.meta.schemaLabel;
        $('heroFingerprintChip').textContent = 'Отпечаток: #' + report.meta.fingerprint.slice(0, 10);

        // 4 KPI Cards
        $('kpiConfirmedTotal').textContent = formatUsd(report.confirmed.effectiveTotal);
        let confSub = report.meta.validRowCount + ' строк · ' + report.meta.periodLabel;
        if (report.confirmed.hasSeparateBilledCost) {
          confSub += ' · BilledCost: ' + formatUsd(report.confirmed.billedTotal);
        }
        $('kpiConfirmedSub').textContent = confSub;

        $('kpiEligibleBase').textContent = formatUsd(report.confirmed.eligibleBaseTotal);
        let eligSub = formatPct(report.confirmed.eligibleBaseSharePct) + ' от подтверждённых расходов';
        if (report.confirmed.unusedCommitmentTotal > 0) {
          eligSub += ' · Unused SP: ' + formatUsd(report.confirmed.unusedCommitmentTotal);
        }
        $('kpiEligibleSub').textContent = eligSub;

        $('kpiEstMonthly').textContent = formatUsd(report.estimated.monthlyTotal);
        $('kpiEstMonthlySub').textContent = formatPct(report.estimated.savingsSharePct) + ' от счёта · сценарий «' + report.assumptions.name + '»';

        $('kpiEstAnnual').textContent = formatUsd(report.estimated.annualTotal);
        $('kpiEstAnnualSub').textContent = 'Модельная экстраполяция ×12 при сохранении текущего профиля';

        // Service Breakdown Bars (Confirmed Fact)
        const maxService = Math.max(1, ...report.confirmed.services.map((s) => s.effectiveCost));
        $('serviceBreakdownList').innerHTML = report.confirmed.services.map((s) => {
          const width = Math.max(2, Math.round((s.effectiveCost / maxService) * 100));
          return (
            '<div class="fg-bar-row">' +
              '<div class="fg-bar-meta">' +
                '<span><strong>' + escapeHtml(s.service) + '</strong> <span class="mono" style="font-size:11px; color:var(--cf-ink-muted);">(' + s.count + ' стр.)</span></span>' +
                '<span class="mono"><strong>' + escapeHtml(formatUsd(s.effectiveCost)) + '</strong> <span style="color:var(--cf-ink-muted);">(' + formatPct(s.sharePct) + ')</span></span>' +
              '</div>' +
              '<div class="fg-bar-track"><div class="fg-bar-fill" style="width:' + width + '%;"></div></div>' +
            '</div>'
          );
        }).join('');

        const focusNote = $('focusReconciliationNote');
        if (report.confirmed.hasSeparateBilledCost) {
          focusNote.style.display = 'block';
          focusNote.innerHTML = '<strong>Сверка FinOps FOCUS 1.0:</strong> сумма <span class="mono">EffectiveCost</span> = <span class="mono">' + escapeHtml(formatUsd(report.confirmed.effectiveTotal)) + '</span>; сумма <span class="mono">BilledCost</span> = <span class="mono">' + escapeHtml(formatUsd(report.confirmed.billedTotal)) + '</span> (строки Purchase с EffectiveCost $0 учтены без двойного счёта).';
        } else {
          focusNote.style.display = 'none';
        }

        // Levers Table
        $('leversTableBody').innerHTML = report.estimated.levers.map((l) => {
          return (
            '<tr class="' + (l.active ? '' : 'is-inactive') + '">' +
              '<td>' +
                '<div><strong>' + escapeHtml(l.title) + '</strong></div>' +
                '<div class="fg-formula">' + escapeHtml(l.formula) + '</div>' +
                '<div style="font-size:11.5px; color:var(--cf-ink-muted); margin-top:4px;">Проверка: ' + escapeHtml(l.verificationCheck) + '</div>' +
              '</td>' +
              '<td class="num">' + escapeHtml(formatUsd(l.confirmedBase)) + '</td>' +
              '<td class="num"><strong>' + escapeHtml(formatUsd(l.monthlyEstimate)) + '</strong></td>' +
              '<td class="num">' + escapeHtml(formatUsd(l.annualEstimate)) + '</td>' +
            '</tr>'
          );
        }).join('');

        $('leversTableFoot').innerHTML =
          '<tr>' +
            '<td>Итого (уникальная подтверждённая база / суммарная оценка по модели)</td>' +
            '<td class="num">' + escapeHtml(formatUsd(report.confirmed.eligibleBaseTotal)) + '</td>' +
            '<td class="num">' + escapeHtml(formatUsd(report.estimated.monthlyTotal)) + '</td>' +
            '<td class="num">' + escapeHtml(formatUsd(report.estimated.annualTotal)) + '</td>' +
          '</tr>';

        // Raw rows drawer
        $('rowsDrawerCount').textContent = String(report.confirmed.rows.length);
        $('rawRowsTableBody').innerHTML = report.confirmed.rows.map((r) => {
          const cls = CLASS_LABELS[r.rowClass] || { text: r.rowClass, badge: 'badge-neutral' };
          return (
            '<tr>' +
              '<td><strong>' + escapeHtml(r.service) + '</strong><div class="mono" style="font-size:11px; color:var(--cf-ink-muted);">' + escapeHtml(r.region) + ' · ' + escapeHtml(r.date) + '</div></td>' +
              '<td class="mono" style="font-size:12px;">' + escapeHtml(r.resource) + '<div style="font-family:var(--font-sans); font-size:11.5px; color:var(--cf-ink-muted);">' + escapeHtml(r.detailNote) + '</div></td>' +
              '<td><span class="badge ' + cls.badge + '">' + escapeHtml(cls.text) + '</span></td>' +
              '<td class="num">' + escapeHtml(formatUsd(r.effectiveCost)) + '</td>' +
            '</tr>'
          );
        }).join('');

        // Diagnostics drawer
        const colPairs = Object.entries(report.meta.columnMap)
          .filter(([, v]) => Boolean(v))
          .map(([k, v]) => '<li><span class="mono">' + escapeHtml(k) + '</span> ← <span class="mono">' + escapeHtml(v) + '</span></li>')
          .join('');
        $('diagnosticsBody').innerHTML =
          '<p style="margin-top:0;"><strong>Схема:</strong> ' + escapeHtml(report.meta.schemaLabel) + ' · <strong>Разделитель:</strong> <span class="mono">' + escapeHtml(report.meta.delimiter) + '</span> · <strong>Отпечаток входа:</strong> <span class="mono">#' + escapeHtml(report.meta.fingerprint) + '</span></p>' +
          '<p><strong>Обработано строк:</strong> ' + report.meta.validRowCount + ' · <strong>Пропущено строк:</strong> ' + report.meta.skippedRowCount + ' · <strong>Время расчёта:</strong> <span class="mono">' + report.meta.elapsedMs + ' мс</span></p>' +
          '<p style="margin-bottom:4px;"><strong>Сопоставленные колонки CSV:</strong></p>' +
          '<ul style="margin:0; padding-left:18px; columns:2; gap:16px;">' + colPairs + '</ul>';

        // Printable A4 Plan Sheet
        renderPrintablePlan(report);
      }

      function renderPrintablePlan(report) {
        const dt = new Date(report.meta.generatedAtIso);
        const formattedDate = dt.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
        $('printGeneratedAt').textContent = formattedDate;
        $('printSyncStatus').textContent = 'Актуален для файла ' + report.meta.filename + ' (отпечаток #' + report.meta.fingerprint.slice(0, 10) + ', сценарий «' + report.assumptions.name + '»).';
        $('printFooterChecksum').textContent = 'Отпечаток CSV: #' + report.meta.fingerprint + ' · ' + report.meta.filename;

        $('printMetaGrid').innerHTML =
          '<div class="print-meta-item"><span>Файл-источник</span><strong>' + escapeHtml(report.meta.filename) + '</strong></div>' +
          '<div class="print-meta-item"><span>Распознанный стандарт</span><strong>' + escapeHtml(report.meta.schemaLabel) + '</strong></div>' +
          '<div class="print-meta-item"><span>Период биллинга</span><strong>' + escapeHtml(report.meta.periodLabel) + '</strong></div>' +
          '<div class="print-meta-item"><span>Контрольный отпечаток CSV</span><strong>#' + escapeHtml(report.meta.fingerprint) + '</strong></div>';

        $('printConfirmedTotal').textContent = formatUsd(report.confirmed.effectiveTotal);
        $('printConfirmedDetail').textContent =
          report.meta.validRowCount + ' валидных строк' +
          (report.confirmed.hasSeparateBilledCost ? ' · BilledCost: ' + formatUsd(report.confirmed.billedTotal) : '') +
          ' · База под оптимизацию: ' + formatUsd(report.confirmed.eligibleBaseTotal) + ' (' + formatPct(report.confirmed.eligibleBaseSharePct) + ')';

        $('printEstimatedTotal').textContent = formatUsd(report.estimated.monthlyTotal) + ' / мес';
        $('printEstimatedDetail').textContent =
          'Годовой потенциал (×12): ' + formatUsd(report.estimated.annualTotal) +
          ' (' + formatPct(report.estimated.savingsSharePct) + ' от подтверждённого счёта)';

        $('printServicesBody').innerHTML = report.confirmed.services.map((s) =>
          '<tr>' +
            '<td><strong>' + escapeHtml(s.service) + '</strong></td>' +
            '<td class="num">' + s.count + '</td>' +
            '<td class="num">' + formatPct(s.sharePct) + '</td>' +
            '<td class="num">' + escapeHtml(formatUsd(s.effectiveCost)) + '</td>' +
          '</tr>'
        ).join('');

        $('printServicesFoot').innerHTML =
          '<tr>' +
            '<td>ИТОГО ПОДТВЕРЖДЁННЫЕ РАСХОДЫ (ФАКТ CSV)</td>' +
            '<td class="num">' + report.meta.validRowCount + '</td>' +
            '<td class="num">100.0%</td>' +
            '<td class="num">' + escapeHtml(formatUsd(report.confirmed.effectiveTotal)) + '</td>' +
          '</tr>';

        $('printScenarioBadge').textContent = 'Сценарий: ' + report.assumptions.name;
        const assumptionRows = [
          ['Скидка 1-Yr Savings Plans / CUD', report.assumptions.computeSpDiscountPct + '%', 'Применяется только к подтверждённым On-Demand Compute / Managed DB строкам; уже покрытые SP/RI исключены.'],
          ['Доля устранения Idle Storage / Unused SP', report.assumptions.idleCleanupPct + '%', 'Оценка извлекаемого эффекта после проверки владельцами непривязанных дисков, снапшотов и Unused Commitments.'],
          ['Оптимизация NAT Bytes и логов', report.assumptions.networkLogOptPct + '%', 'Применяется к строкам NAT Data Processing / Egress и CloudWatch / Cloud Logging ingestion.'],
          ['Целевой LLM Prompt Caching', report.assumptions.llmCacheTargetPct + '% (скидка 65%)', 'Применяется к разнице между целью и фактическим кэшем input-токенов (вес input vs 4×output).'],
          ['Перенос LLM на Batch / малые модели', report.assumptions.llmBatchRoutePct + '% × 50% скидка', 'Применяется последовательно к остаточной стоимости флагманских non-batch строк после Prompt Caching.']
        ];
        $('printAssumptionsBody').innerHTML = assumptionRows.map((a) =>
          '<tr><td><strong>' + escapeHtml(a[0]) + '</strong></td><td class="num">' + escapeHtml(a[1]) + '</td><td>' + escapeHtml(a[2]) + '</td></tr>'
        ).join('');

        $('printPlanBody').innerHTML = report.estimated.levers.map((l) =>
          '<tr class="' + (l.active ? '' : 'is-inactive') + '">' +
            '<td class="mono" style="white-space:nowrap;">' + escapeHtml(l.window) + '</td>' +
            '<td><strong>' + escapeHtml(l.title) + '</strong><div class="fg-formula">' + escapeHtml(l.formula) + '</div></td>' +
            '<td class="num">' + escapeHtml(formatUsd(l.confirmedBase)) + '</td>' +
            '<td class="num"><strong>' + escapeHtml(formatUsd(l.monthlyEstimate)) + '</strong></td>' +
            '<td class="num">' + escapeHtml(formatUsd(l.annualEstimate)) + '</td>' +
            '<td style="font-size:11.5px;">' + escapeHtml(l.verificationCheck) + '</td>' +
          '</tr>'
        ).join('');

        $('printPlanFoot').innerHTML =
          '<tr>' +
            '<td colspan="2">ИТОГО ОЦЕНКА ЭКОНОМИИ ПО АКТИВНЫМ ПРЕДПОЛОЖЕНИЯМ</td>' +
            '<td class="num">' + escapeHtml(formatUsd(report.confirmed.eligibleBaseTotal)) + '</td>' +
            '<td class="num">' + escapeHtml(formatUsd(report.estimated.monthlyTotal)) + '</td>' +
            '<td class="num">' + escapeHtml(formatUsd(report.estimated.annualTotal)) + '</td>' +
            '<td style="font-size:11px;">Не является гарантией до инженерного ревью</td>' +
          '</tr>';

        $('printIntegrityBox').innerHTML =
          'Импортировано валидных строк: <strong>' + report.meta.validRowCount + '</strong> · Пропущено строк: <strong>' + report.meta.skippedRowCount + '</strong> · ' +
          'Неиспользованные обязательства (факт в CSV): <strong>' + escapeHtml(formatUsd(report.confirmed.unusedCommitmentTotal)) + '</strong> · ' +
          'Idle/архивное хранилище (факт в CSV): <strong>' + escapeHtml(formatUsd(report.confirmed.idleStorageTotal)) + '</strong> · ' +
          'Вычислительный движок: локальный клиентский расчёт (0 внешних API-передач).';
      }

      function runAudit(csvText, filename, sourceReason) {
        updateProgressStrip(
          'importProgressStrip', 'importProgressLabel', 'importProgressTiming', 'importProgressFill',
          'is-running', 'Этап 1/3: Парсинг CSV и валидация схемы...', '35%', 35
        );

        const prev = state.report;
        const result = analyzeBillingCsv(csvText, filename, state.assumptions);

        if (result.error) {
          updateProgressStrip(
            'importProgressStrip', 'importProgressLabel', 'importProgressTiming', 'importProgressFill',
            'is-error', 'Ошибка импорта (' + filename + '): ' + result.error, 'Остановлено', 100
          );
          return;
        }

        if (prev && prev.meta.fingerprint !== result.meta.fingerprint) {
          state.previousReport = prev;
        }

        state.currentCsvText = csvText;
        state.currentFilename = filename;
        state.report = result;

        $('rawCsvTextarea').value = csvText;
        renderReport(result);
        renderDeltaBar(state.previousReport, result);

        updateProgressStrip(
          'importProgressStrip', 'importProgressLabel', 'importProgressTiming', 'importProgressFill',
          'is-done',
          'Готово (' + sourceReason + '): ' + result.meta.validRowCount + ' строк · Факт ' + formatUsd(result.confirmed.effectiveTotal) + ' · Оценка ' + formatUsd(result.estimated.monthlyTotal) + '/мес',
          '100% · ' + result.meta.elapsedMs + ' мс',
          100
        );

        updateProgressStrip(
          'exportProgressStrip', 'exportProgressLabel', 'exportProgressTiming', 'exportProgressFill',
          'is-done',
          'Печатный PDF-план синхронизирован с ' + result.meta.filename + ' (#' + result.meta.fingerprint.slice(0, 10) + ')',
          'Обновлено за ' + result.meta.elapsedMs + ' мс',
          100
        );
      }

      function triggerDownload(filename, mimeType, content) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }

      function handleFileUpload(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          state.activePresetKey = 'custom';
          syncPresetButtons();
          runAudit(String(reader.result || ''), file.name, 'загрузка файла');
        };
        reader.onerror = () => {
          updateProgressStrip(
            'importProgressStrip', 'importProgressLabel', 'importProgressTiming', 'importProgressFill',
            'is-error', 'Не удалось прочитать файл ' + file.name + '. Проверьте права доступа и повторите.', 'Ошибка', 100
          );
        };
        reader.readAsText(file);
      }

      /* =====================================================================
         4. EVENT BINDINGS (100% FUNCTIONAL CONTROLS, ZERO PLACEBO)
         ===================================================================== */
      ['stepBtn1', 'stepBtn2', 'stepBtn3'].forEach((id, idx) => {
        $(id).addEventListener('click', () => setStep(idx + 1));
      });

      $('btnGoToPrintTop').addEventListener('click', () => setStep(3));
      $('btnBackToAnalysis').addEventListener('click', () => setStep(2));

      document.querySelectorAll('[data-preset]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-preset');
          const ds = DEMO_DATASETS[key];
          if (!ds) return;
          state.activePresetKey = key;
          syncPresetButtons();
          runAudit(ds.csv, ds.filename, ds.label);
        });
      });

      $('btnLoadMutationA').addEventListener('click', () => {
        state.activePresetKey = 'mutation_a';
        syncPresetButtons();
        runAudit(DEMO_DATASETS.mutation_a.csv, DEMO_DATASETS.mutation_a.filename, DEMO_DATASETS.mutation_a.label);
      });

      $('btnLoadMutationB').addEventListener('click', () => {
        state.activePresetKey = 'mutation_b';
        syncPresetButtons();
        runAudit(DEMO_DATASETS.mutation_b.csv, DEMO_DATASETS.mutation_b.filename, DEMO_DATASETS.mutation_b.label);
      });

      $('btnUploadCsv').addEventListener('click', () => $('csvFileInput').click());
      $('csvFileInput').addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) handleFileUpload(file);
        e.target.value = '';
      });

      const dropZone = $('csvDropZone');
      ['dragenter', 'dragover'].forEach((evt) => {
        dropZone.addEventListener(evt, (e) => {
          e.preventDefault();
          dropZone.classList.add('is-dragover');
        });
      });
      ['dragleave', 'drop'].forEach((evt) => {
        dropZone.addEventListener(evt, (e) => {
          e.preventDefault();
          dropZone.classList.remove('is-dragover');
        });
      });
      dropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
      });

      $('btnApplyRawCsv').addEventListener('click', () => {
        const edited = $('rawCsvTextarea').value;
        state.activePresetKey = 'custom';
        syncPresetButtons();
        runAudit(edited, 'edited_' + state.currentFilename.replace(/^edited_/, ''), 'ручное изменение CSV');
      });

      $('btnDownloadCurrentCsv').addEventListener('click', () => {
        triggerDownload(state.currentFilename, 'text/csv;charset=utf-8', state.currentCsvText);
      });

      document.querySelectorAll('[data-scenario]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-scenario');
          const preset = SCENARIO_PRESETS[key];
          if (!preset) return;
          state.activeScenarioKey = key;
          state.assumptions = Object.assign({}, preset);
          syncAssumptionControls();
          runAudit(state.currentCsvText, state.currentFilename, 'сценарий «' + preset.name + '»');
        });
      });

      const assumptionBindings = [
        ['SpDiscount', 'computeSpDiscountPct', 0, 45],
        ['IdleCleanup', 'idleCleanupPct', 0, 100],
        ['NetworkOpt', 'networkLogOptPct', 0, 75],
        ['LlmCache', 'llmCacheTargetPct', 0, 85],
        ['LlmRoute', 'llmBatchRoutePct', 0, 60]
      ];

      assumptionBindings.forEach(([suffix, prop, min, max]) => {
        const onChange = (rawVal) => {
          const clamped = Math.max(min, Math.min(max, Math.round(Number(rawVal) || 0)));
          state.activeScenarioKey = 'custom';
          state.assumptions = Object.assign({}, state.assumptions, { name: 'Пользовательский', [prop]: clamped });
          syncAssumptionControls();
          runAudit(state.currentCsvText, state.currentFilename, 'изменено предположение');
        };
        $('rng' + suffix).addEventListener('input', (e) => onChange(e.target.value));
        $('inp' + suffix).addEventListener('change', (e) => onChange(e.target.value));
      });

      $('btnTriggerPrint').addEventListener('click', () => {
        const r = state.report;
        if (!r) return;
        updateProgressStrip(
          'exportProgressStrip', 'exportProgressLabel', 'exportProgressTiming', 'exportProgressFill',
          'is-done',
          'Открыт системный диалог печати A4 PDF для ' + r.meta.filename + ' (#' + r.meta.fingerprint.slice(0, 10) + ')',
          'Готово',
          100
        );
        window.print();
      });

      $('btnExportJson').addEventListener('click', () => {
        const r = state.report;
        if (!r) return;
        const outName = 'finopsguard-audit-' + r.meta.fingerprint.slice(0, 8).toLowerCase() + '.json';
        triggerDownload(outName, 'application/json;charset=utf-8', JSON.stringify(r, null, 2));
        updateProgressStrip(
          'exportProgressStrip', 'exportProgressLabel', 'exportProgressTiming', 'exportProgressFill',
          'is-done',
          'Скачан JSON-отчёт: ' + outName + ' (раздельные блоки confirmed / estimated)',
          '100%',
          100
        );
      });

      $('btnExportActionCsv').addEventListener('click', () => {
        const r = state.report;
        if (!r) return;
        const lines = [
          'window,lever_id,title,confirmed_base_usd_fact,formula,monthly_savings_estimate_usd,annual_savings_estimate_usd,required_engineering_check'
        ];
        for (const l of r.estimated.levers) {
          const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
          lines.push([
            esc(l.window),
            esc(l.id),
            esc(l.title),
            l.confirmedBase.toFixed(2),
            esc(l.formula),
            l.monthlyEstimate.toFixed(2),
            l.annualEstimate.toFixed(2),
            esc(l.verificationCheck)
          ].join(','));
        }
        const outName = 'finopsguard-plan-' + r.meta.fingerprint.slice(0, 8).toLowerCase() + '.csv';
        triggerDownload(outName, 'text/csv;charset=utf-8', lines.join('\n'));
        updateProgressStrip(
          'exportProgressStrip', 'exportProgressLabel', 'exportProgressTiming', 'exportProgressFill',
          'is-done',
          'Скачан план действий CSV: ' + outName,
          '100%',
          100
        );
      });

      // Initialize with Option 1 (AWS CUR Baseline) immediately on open
      syncPresetButtons();
      syncAssumptionControls();
      runAudit(DEMO_DATASETS.aws_cur.csv, DEMO_DATASETS.aws_cur.filename, DEMO_DATASETS.aws_cur.label);
    })();
