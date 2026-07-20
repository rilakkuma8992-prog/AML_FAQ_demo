// ============================================================
// Demo question bank.
// Chinese and English live in the same record so both languages always point
// to the same business line, topic, question, answer, and reference.
// ============================================================

const DB = {
  corporate: {
    label: {
      zh: "企金",
      en: "Corporate Banking"
    },
    topics: {
      kyc_customer_identification: {
        category: "kyc",
        label: {
          zh: "KYC客戶身分辨識",
          en: "KYC Customer Identification"
        },
        questions: [
          {
            q: {
              zh: "境外法人客戶開戶，需要準備哪些身分證明文件？",
              en: "What identity documents are required when opening an account for an offshore corporate customer?"
            },
            a: {
              zh: "境外法人開戶需檢附：1. 公司註冊證明及章程　2. 最新股東名冊/受益所有人資料　3. 負責人身分證明　4. 授權書（如委託代理人辦理）。文件需為近3個月內或有效期內。",
              en: "For an offshore corporate account opening, obtain: 1. certificate of incorporation and articles of association; 2. latest shareholder register and beneficial ownership information; 3. identification of the responsible person; 4. authorization letter if an agent handles the process. Documents must be issued within the last three months or still be valid."
            },
            ref: {
              zh: "OO銀行防制洗錢及打擊資恐內部作業要點 第5條",
              en: "OO Bank Internal AML/CFT Operating Guidelines, Article 5"
            }
          },
          {
            q: {
              zh: "客戶為國內公司但主要股東是境外法人，KYC要多做什麼？",
              en: "If the customer is a domestic company but its major shareholder is an offshore entity, what additional KYC steps are required?"
            },
            a: {
              zh: "除一般KYC文件外，需追溯至最終自然人層級，取得境外股東的公司登記文件與受益人資料，並確認該境外股東所在地是否為高風險地區。",
              en: "In addition to standard KYC documents, trace ownership to the ultimate natural person, obtain the offshore shareholder's registration documents and beneficial ownership information, and verify whether the offshore shareholder is located in a high-risk jurisdiction."
            },
            ref: {
              zh: "客戶審查作業辦法 第9條",
              en: "Customer Due Diligence Procedures, Article 9"
            }
          }
        ]
      },
      beneficial_owner_identification: {
        category: "cdd-edd",
        label: {
          zh: "受益人辨識",
          en: "Beneficial Owner Identification"
        },
        questions: [
          {
            q: {
              zh: "如何判斷客戶的「實質受益人」是誰？",
              en: "How do we determine who the customer's beneficial owner is?"
            },
            a: {
              zh: "實質受益人原則上為直接或間接持有該法人股份或資本超過25%之自然人；若無此人，則辨識對該法人具最終控制權之自然人（如董事長）。",
              en: "As a general rule, the beneficial owner is the natural person who directly or indirectly owns more than 25% of the legal person's shares or capital. If no such person exists, identify the natural person who ultimately controls the legal person, such as the chairperson."
            },
            ref: {
              zh: "洗錢防制法施行細則 第4條；客戶審查作業辦法 第8條",
              en: "Enforcement Rules of the Money Laundering Control Act, Article 4; Customer Due Diligence Procedures, Article 8"
            }
          },
          {
            q: {
              zh: "受益人資料客戶不願意提供，可以先開戶嗎？",
              en: "Can we open an account first if the customer refuses to provide beneficial ownership information?"
            },
            a: {
              zh: "不可以。無法完成受益人辨識視同無法完成客戶審查，依規定應婉拒建立業務關係，不得先開戶再補件。",
              en: "No. If beneficial owner identification cannot be completed, customer due diligence is considered incomplete. The business relationship should be declined, and the account must not be opened first with documents to follow later."
            },
            ref: {
              zh: "客戶審查作業辦法 第10條",
              en: "Customer Due Diligence Procedures, Article 10"
            }
          }
        ]
      },
      sanctions_and_pep: {
        category: "wlf",
        label: {
          zh: "制裁名單與PEP政治人物",
          en: "Sanctions Lists and PEPs"
        },
        questions: [
          {
            q: {
              zh: "開戶時篩檢到客戶姓名與制裁名單「疑似相符」，該怎麼辦？",
              en: "What should we do if a customer's name appears to be a potential match to a sanctions list during account opening?"
            },
            a: {
              zh: "應立即停止該筆開戶/交易流程，於24小時內陳報洗防專責主管進行人工複核，複核前不得撥款或執行交易，並保留篩檢紀錄。",
              en: "Immediately stop the account opening or transaction process and report it to the dedicated AML supervisor within 24 hours for manual review. Do not disburse funds or execute the transaction before the review is completed, and retain the screening records."
            },
            ref: {
              zh: "資恐防制洗防作業要點 第6條",
              en: "CFT and AML Operating Guidelines, Article 6"
            }
          },
          {
            q: {
              zh: "客戶為現任政府官員的配偶，算不算PEP？",
              en: "If the customer is the spouse of a current government official, is the customer considered a PEP?"
            },
            a: {
              zh: "政府高階官員的家屬（配偶、子女、父母等）屬「PEP之關係人」，應比照PEP辦理強化審查（EDD），而非一般客戶審查。",
              en: "Family members of senior government officials, such as spouses, children, and parents, are treated as PEP-related parties. Enhanced due diligence should be applied in line with PEP requirements, rather than standard customer due diligence."
            },
            ref: {
              zh: "高風險客戶名單管理辦法 第5條",
              en: "High-Risk Customer List Management Rules, Article 5"
            }
          }
        ]
      },
      cross_border_remittance: {
        category: "overseas",
        label: {
          zh: "跨境匯款相關",
          en: "Cross-Border Remittance"
        },
        questions: [
          {
            q: {
              zh: "海外分行辦理跨境匯款，SWIFT電文欄位資訊不足時可以直接匯出嗎？",
              en: "Can an overseas branch send a cross-border remittance if the SWIFT message fields are incomplete?"
            },
            a: {
              zh: "不可以。匯款人與受款人完整資訊（姓名、帳號、地址等）為監理要求之必要欄位，資訊不完整應先向匯款分行補正，補正前應暫停撥款。",
              en: "No. Complete originator and beneficiary information, including name, account number, and address, is required by regulation. If the information is incomplete, request correction from the remitting branch and suspend payment until the information is completed."
            },
            ref: {
              zh: "跨境匯款電文資訊規範 第4條",
              en: "Cross-Border Remittance Message Information Standards, Article 4"
            }
          },
          {
            q: {
              zh: "客戶要求代收款項後立即轉匯給第三人，這樣可以嗎？",
              en: "Can we process funds received on behalf of a customer and immediately transfer them to a third party?"
            },
            a: {
              zh: "此類「過水」交易型態風險較高，應先了解交易目的與資金關係，若無合理商業理由，應婉拒承作並評估是否簽報疑似洗錢交易。",
              en: "This pass-through transaction pattern carries higher risk. First understand the transaction purpose and funding relationship. If there is no reasonable business rationale, decline the transaction and assess whether it should be escalated as a suspicious money laundering transaction."
            },
            ref: {
              zh: "疑似洗錢或資恐交易申報作業程序 第5條",
              en: "Suspicious ML/TF Transaction Reporting Procedures, Article 5"
            }
          }
        ]
      }
    }
  },
  consumer: {
    label: {
      zh: "消金",
      en: "Consumer Banking"
    },
    topics: {
      suspicious_transaction_reporting: {
        category: "overseas",
        label: {
          zh: "疑似洗錢交易通報(STR)",
          en: "Suspicious Transaction Reporting (STR)"
        },
        questions: [
          {
            q: {
              zh: "客戶短期內大額頻繁跨行匯款，需要怎麼處理？",
              en: "What should we do if a customer makes large and frequent interbank remittances within a short period?"
            },
            a: {
              zh: "請先於系統標記為關注交易，調閱近6個月交易紀錄，確認資金來源與客戶身分背景是否相符；如無法合理說明，應簽報洗防/AML專責人員評估是否申報疑似洗錢交易（STR）。",
              en: "First mark the activity as a monitored transaction in the system and review the past six months of transaction records. Confirm whether the source of funds is consistent with the customer's profile. If there is no reasonable explanation, escalate to dedicated AML personnel for assessment of whether an STR should be filed."
            },
            ref: {
              zh: "疑似洗錢或資恐交易申報作業程序 第3條",
              en: "Suspicious ML/TF Transaction Reporting Procedures, Article 3"
            }
          },
          {
            q: {
              zh: "學生帳戶忽然出現大筆境外匯入款，要注意什麼？",
              en: "What should we check if a student account suddenly receives a large overseas remittance?"
            },
            a: {
              zh: "應確認資金來源是否與客戶職業/收入狀況相符（如非獎學金、家人匯款等合理說明），必要時請客戶說明並保留佐證，異常者應通報。",
              en: "Confirm whether the source of funds is consistent with the customer's occupation and income profile, such as scholarship funds or family remittance. Request an explanation and retain supporting documents when needed. Escalate abnormal cases."
            },
            ref: {
              zh: "疑似洗錢或資恐交易申報作業程序 第3條",
              en: "Suspicious ML/TF Transaction Reporting Procedures, Article 3"
            }
          }
        ]
      },
      high_risk_customers_and_countries: {
        category: "sanctions",
        label: {
          zh: "高風險客戶與國家",
          en: "High-Risk Customers and Countries"
        },
        questions: [
          {
            q: {
              zh: "客戶國籍為高風險地區，可以承作業務嗎？",
              en: "Can we provide services if the customer's nationality is a high-risk jurisdiction?"
            },
            a: {
              zh: "屬本行高風險地區客戶清單者，原則上採取強化審查（EDD），需經洗防單位核准後才能承作，且須每年至少覆審一次。",
              en: "If the customer falls within the bank's high-risk jurisdiction customer list, enhanced due diligence should generally be applied. Business may proceed only after approval by the AML unit, and the customer must be reviewed at least annually."
            },
            ref: {
              zh: "高風險客戶名單管理辦法 第2、7條",
              en: "High-Risk Customer List Management Rules, Articles 2 and 7"
            }
          },
          {
            q: {
              zh: "客戶職業為現金密集行業（如當舖），開戶要加強什麼？",
              en: "What should be enhanced when opening an account for a cash-intensive business, such as a pawnshop?"
            },
            a: {
              zh: "現金密集行業客戶應加強了解其資金流程與交易型態合理性，建議調高交易監控頻率，並於首次開戶時說明主要往來對象與資金來源。",
              en: "For cash-intensive customers, obtain a deeper understanding of cash flows and whether the transaction pattern is reasonable. Consider increasing monitoring frequency, and ask the customer to explain major counterparties and source of funds at initial account opening."
            },
            ref: {
              zh: "高風險客戶名單管理辦法 第9條",
              en: "High-Risk Customer List Management Rules, Article 9"
            }
          }
        ]
      },
      cdd_edd_customer_due_diligence: {
        category: "cdd-edd",
        label: {
          zh: "CDD/EDD客戶審查",
          en: "CDD/EDD Customer Due Diligence"
        },
        questions: [
          {
            q: {
              zh: "一般客戶跟高風險客戶的審查頻率有什麼不同？",
              en: "How does the review frequency differ between standard customers and high-risk customers?"
            },
            a: {
              zh: "一般客戶原則上每3年覆審一次；高風險客戶（含PEP、高風險地區客戶等）應每年至少覆審一次，且覆審內容需包含資金來源合理性重新確認。",
              en: "Standard customers are generally reviewed once every three years. High-risk customers, including PEPs and customers from high-risk jurisdictions, should be reviewed at least annually, and the review should include reconfirmation that the source of funds is reasonable."
            },
            ref: {
              zh: "客戶審查作業辦法 第14條",
              en: "Customer Due Diligence Procedures, Article 14"
            }
          },
          {
            q: {
              zh: "客戶不願說明資金來源，該如何處理？",
              en: "What should we do if a customer refuses to explain the source of funds?"
            },
            a: {
              zh: "客戶審查程序中資金來源說明為必要項目，客戶拒絕提供時應婉拒建立/繼續業務關係，並視情節評估是否申報疑似洗錢交易。",
              en: "Source-of-funds information is required in the customer due diligence process. If the customer refuses to provide it, decline to establish or continue the business relationship and assess whether a suspicious money laundering transaction report is needed."
            },
            ref: {
              zh: "客戶審查作業辦法 第11條",
              en: "Customer Due Diligence Procedures, Article 11"
            }
          }
        ]
      }
    }
  }
};

const HOT = [
  {biz:"corporate", topic:"sanctions_and_pep", idx:0},
  {biz:"consumer", topic:"suspicious_transaction_reporting", idx:0},
  {biz:"corporate", topic:"beneficial_owner_identification", idx:0},
  {biz:"consumer", topic:"high_risk_customers_and_countries", idx:0},
  {biz:"corporate", topic:"cross_border_remittance", idx:0}
];
