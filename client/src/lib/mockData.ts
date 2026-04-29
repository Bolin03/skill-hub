// SkillHub Mock Data
// Design: Linear/Notion style - clean, minimal, professional

export interface Skill {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  author: string;
  authorAvatar: string;
  version: string;
  downloads: number;
  heat: number;
  likes: number;
  favorites: number;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  status: "published" | "reviewing" | "draft";
  // Detail page fields
  features: string[];
  usageExample: string;
  inputOutput: {
    inputs: { name: string; type: string; description: string }[];
    outputs: { name: string; type: string; description: string }[];
  };
  installSteps: string[];
  changelog: { version: string; date: string; changes: string[] }[];
}

const COVER_IMAGES = [
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=112&h=112&fit=crop",
  "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=112&h=112&fit=crop",
];

export const MOCK_SKILLS: Skill[] = [
  {
    id: "skill-001",
    name: "Web Search Pro",
    description: "强大的网络搜索能力，支持多引擎并行搜索，自动去重与结果排序",
    longDescription: "Web Search Pro 是一个专为 Agent 设计的高性能网络搜索 Skill，支持 Google、Bing、DuckDuckGo 等多个搜索引擎并行查询，内置智能去重算法和相关性排序，可大幅提升 Agent 的信息获取效率。",
    tags: ["搜索", "网络", "信息获取"],
    category: "信息获取",
    author: "SkillHub Team",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=ST&backgroundColor=3b82f6",
    version: "2.3.1",
    downloads: 48320,
    heat: 9850,
    likes: 3241,
    favorites: 1876,
    coverImage: COVER_IMAGES[0],
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
    status: "published",
    features: ["多引擎并行搜索", "智能去重", "相关性排序", "结果摘要提取", "支持图片/视频搜索"],
    usageExample: `skill = WebSearchPro()\nresults = skill.search("最新 AI 技术进展", engines=["google", "bing"], limit=10)\nfor r in results:\n    print(r.title, r.url, r.snippet)`,
    inputOutput: {
      inputs: [
        { name: "query", type: "string", description: "搜索关键词" },
        { name: "engines", type: "array", description: "搜索引擎列表" },
        { name: "limit", type: "number", description: "返回结果数量" },
      ],
      outputs: [
        { name: "results", type: "array", description: "搜索结果列表" },
        { name: "total", type: "number", description: "总结果数量" },
      ],
    },
    installSteps: [
      "从 SkillHub 下载 skill 包",
      "解压到 ~/.agent/skills/ 目录",
      "运行 agent skill install web-search-pro",
      "在 agent 配置中启用该 skill",
    ],
    changelog: [
      { version: "2.3.1", date: "2024-03-20", changes: ["修复 Bing 搜索超时问题", "优化结果去重算法"] },
      { version: "2.3.0", date: "2024-02-10", changes: ["新增 DuckDuckGo 支持", "添加图片搜索功能"] },
    ],
  },
  {
    id: "skill-002",
    name: "Code Executor",
    description: "安全沙箱代码执行环境，支持 Python、JavaScript、Go 等多种语言",
    longDescription: "Code Executor 提供隔离的代码执行沙箱，Agent 可以安全地运行用户提供的代码片段，支持多种编程语言，内置超时控制和资源限制，确保执行安全可靠。",
    tags: ["代码执行", "沙箱", "多语言"],
    category: "代码工具",
    author: "DevTools Lab",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DL&backgroundColor=8b5cf6",
    version: "1.8.0",
    downloads: 35670,
    heat: 8720,
    likes: 2890,
    favorites: 1543,
    coverImage: COVER_IMAGES[1],
    createdAt: "2024-02-01",
    updatedAt: "2024-03-18",
    status: "published",
    features: ["多语言支持", "安全沙箱隔离", "超时控制", "资源限制", "标准输入输出捕获"],
    usageExample: `executor = CodeExecutor()\nresult = executor.run(\n  code="print('Hello, World!')",\n  language="python",\n  timeout=30\n)\nprint(result.stdout)`,
    inputOutput: {
      inputs: [
        { name: "code", type: "string", description: "要执行的代码" },
        { name: "language", type: "string", description: "编程语言" },
        { name: "timeout", type: "number", description: "超时时间（秒）" },
      ],
      outputs: [
        { name: "stdout", type: "string", description: "标准输出" },
        { name: "stderr", type: "string", description: "错误输出" },
        { name: "exitCode", type: "number", description: "退出码" },
      ],
    },
    installSteps: [
      "下载 code-executor skill 包",
      "安装 Docker 依赖（用于沙箱隔离）",
      "运行 agent skill install code-executor",
      "配置资源限制参数",
    ],
    changelog: [
      { version: "1.8.0", date: "2024-03-18", changes: ["新增 Go 语言支持", "优化沙箱启动速度"] },
    ],
  },
  {
    id: "skill-003",
    name: "File Manager",
    description: "智能文件管理工具，支持读写、搜索、格式转换等文件操作",
    longDescription: "File Manager 为 Agent 提供完整的文件系统操作能力，包括文件读写、目录管理、内容搜索、格式转换等功能，支持本地文件和云存储。",
    tags: ["文件管理", "存储", "格式转换"],
    category: "文件工具",
    author: "CloudFile Inc",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=CF&backgroundColor=10b981",
    version: "3.1.2",
    downloads: 29840,
    heat: 7650,
    likes: 2156,
    favorites: 1234,
    coverImage: COVER_IMAGES[2],
    createdAt: "2023-11-20",
    updatedAt: "2024-03-15",
    status: "published",
    features: ["文件读写", "目录管理", "内容搜索", "格式转换", "云存储支持"],
    usageExample: `fm = FileManager()\ncontent = fm.read("report.txt")\nfm.write("output.md", content)\nresults = fm.search("*.py", recursive=True)`,
    inputOutput: {
      inputs: [
        { name: "path", type: "string", description: "文件路径" },
        { name: "content", type: "string", description: "文件内容（写入时）" },
      ],
      outputs: [
        { name: "content", type: "string", description: "文件内容（读取时）" },
        { name: "files", type: "array", description: "文件列表（搜索时）" },
      ],
    },
    installSteps: [
      "下载 file-manager skill 包",
      "运行 agent skill install file-manager",
      "配置工作目录权限",
    ],
    changelog: [
      { version: "3.1.2", date: "2024-03-15", changes: ["修复大文件读取内存溢出问题"] },
    ],
  },
  {
    id: "skill-004",
    name: "Data Analyzer",
    description: "数据分析与可视化 Skill，支持 CSV、Excel、JSON 数据处理与图表生成",
    longDescription: "Data Analyzer 让 Agent 具备专业的数据分析能力，可以处理各种格式的数据文件，执行统计分析，并生成直观的可视化图表。",
    tags: ["数据分析", "可视化", "统计"],
    category: "数据工具",
    author: "Analytics AI",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AA&backgroundColor=f59e0b",
    version: "2.0.5",
    downloads: 22190,
    heat: 6890,
    likes: 1876,
    favorites: 987,
    coverImage: COVER_IMAGES[3],
    createdAt: "2024-01-08",
    updatedAt: "2024-03-10",
    status: "published",
    features: ["多格式数据读取", "统计分析", "图表生成", "异常检测", "数据清洗"],
    usageExample: `analyzer = DataAnalyzer()\ndf = analyzer.load("sales.csv")\nstats = analyzer.describe(df)\nchart = analyzer.plot(df, type="bar", x="month", y="revenue")`,
    inputOutput: {
      inputs: [
        { name: "file", type: "string", description: "数据文件路径" },
        { name: "query", type: "string", description: "分析查询语句" },
      ],
      outputs: [
        { name: "result", type: "object", description: "分析结果" },
        { name: "chart", type: "string", description: "图表 base64 数据" },
      ],
    },
    installSteps: [
      "下载 data-analyzer skill 包",
      "安装 pandas、matplotlib 依赖",
      "运行 agent skill install data-analyzer",
    ],
    changelog: [
      { version: "2.0.5", date: "2024-03-10", changes: ["新增异常检测功能", "优化大数据集处理性能"] },
    ],
  },
  {
    id: "skill-005",
    name: "Email Sender",
    description: "邮件发送与管理 Skill，支持 SMTP、OAuth 认证，支持 HTML 模板",
    longDescription: "Email Sender 为 Agent 提供完整的邮件处理能力，支持发送、接收、搜索邮件，内置 HTML 模板引擎，可轻松创建专业的邮件内容。",
    tags: ["邮件", "通信", "自动化"],
    category: "通信工具",
    author: "MailBot Pro",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=MB&backgroundColor=ef4444",
    version: "1.5.3",
    downloads: 18760,
    heat: 5430,
    likes: 1432,
    favorites: 765,
    coverImage: COVER_IMAGES[4],
    createdAt: "2023-12-10",
    updatedAt: "2024-02-28",
    status: "published",
    features: ["SMTP 发送", "OAuth 认证", "HTML 模板", "附件支持", "批量发送"],
    usageExample: `mailer = EmailSender()\nmailer.send(\n  to="user@example.com",\n  subject="报告已生成",\n  body="<h1>您的报告</h1>",\n  attachments=["report.pdf"]\n)`,
    inputOutput: {
      inputs: [
        { name: "to", type: "string", description: "收件人邮箱" },
        { name: "subject", type: "string", description: "邮件主题" },
        { name: "body", type: "string", description: "邮件正文（HTML）" },
      ],
      outputs: [
        { name: "messageId", type: "string", description: "邮件 ID" },
        { name: "success", type: "boolean", description: "是否发送成功" },
      ],
    },
    installSteps: [
      "下载 email-sender skill 包",
      "配置 SMTP 服务器信息",
      "运行 agent skill install email-sender",
    ],
    changelog: [
      { version: "1.5.3", date: "2024-02-28", changes: ["支持 Gmail OAuth 2.0", "修复附件编码问题"] },
    ],
  },
  {
    id: "skill-006",
    name: "Browser Automation",
    description: "浏览器自动化 Skill，基于 Playwright，支持网页操作、截图、表单填写",
    longDescription: "Browser Automation 基于 Playwright 构建，为 Agent 提供强大的浏览器控制能力，可以模拟用户操作、抓取动态内容、自动填写表单。",
    tags: ["浏览器", "自动化", "爬虫"],
    category: "自动化工具",
    author: "AutoBot Labs",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AL&backgroundColor=6366f1",
    version: "4.2.0",
    downloads: 31450,
    heat: 8120,
    likes: 2567,
    favorites: 1398,
    coverImage: COVER_IMAGES[5],
    createdAt: "2024-01-25",
    updatedAt: "2024-03-22",
    status: "published",
    features: ["页面导航", "元素交互", "截图录制", "表单自动填写", "网络请求拦截"],
    usageExample: `browser = BrowserAutomation()\nawait browser.goto("https://example.com")\nawait browser.click("#login-btn")\nawait browser.fill("#email", "user@example.com")\nscreenshot = await browser.screenshot()`,
    inputOutput: {
      inputs: [
        { name: "url", type: "string", description: "目标网页 URL" },
        { name: "actions", type: "array", description: "操作序列" },
      ],
      outputs: [
        { name: "result", type: "object", description: "操作结果" },
        { name: "screenshot", type: "string", description: "页面截图 base64" },
      ],
    },
    installSteps: [
      "下载 browser-automation skill 包",
      "安装 Playwright 浏览器驱动",
      "运行 agent skill install browser-automation",
    ],
    changelog: [
      { version: "4.2.0", date: "2024-03-22", changes: ["升级 Playwright 到最新版", "新增网络请求拦截功能"] },
    ],
  },
  {
    id: "skill-007",
    name: "Image Vision",
    description: "图像理解与分析 Skill，支持物体识别、OCR 文字提取、图像描述生成",
    longDescription: "Image Vision 集成了最先进的计算机视觉模型，为 Agent 提供图像理解能力，包括物体检测、场景识别、文字提取等功能。",
    tags: ["图像识别", "OCR", "视觉AI"],
    category: "AI 工具",
    author: "VisionAI Team",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=VA&backgroundColor=ec4899",
    version: "3.0.1",
    downloads: 27890,
    heat: 7340,
    likes: 2234,
    favorites: 1156,
    coverImage: COVER_IMAGES[6],
    createdAt: "2024-02-15",
    updatedAt: "2024-03-19",
    status: "published",
    features: ["物体识别", "OCR 文字提取", "场景描述", "人脸检测", "图像分类"],
    usageExample: `vision = ImageVision()\nresult = vision.analyze("photo.jpg")\nprint(result.description)\ntext = vision.ocr("document.png")`,
    inputOutput: {
      inputs: [
        { name: "image", type: "string", description: "图像路径或 URL" },
        { name: "tasks", type: "array", description: "分析任务列表" },
      ],
      outputs: [
        { name: "description", type: "string", description: "图像描述" },
        { name: "objects", type: "array", description: "检测到的物体" },
        { name: "text", type: "string", description: "提取的文字" },
      ],
    },
    installSteps: [
      "下载 image-vision skill 包",
      "配置 AI 模型 API Key",
      "运行 agent skill install image-vision",
    ],
    changelog: [
      { version: "3.0.1", date: "2024-03-19", changes: ["提升 OCR 准确率", "新增中文文字识别"] },
    ],
  },
  {
    id: "skill-008",
    name: "Calendar Manager",
    description: "日历与日程管理 Skill，支持 Google Calendar、Outlook 集成",
    longDescription: "Calendar Manager 让 Agent 能够管理用户的日程安排，支持创建、修改、删除事件，与主流日历服务无缝集成。",
    tags: ["日历", "日程", "时间管理"],
    category: "生产力工具",
    author: "TimeSync Co",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TS&backgroundColor=14b8a6",
    version: "2.1.0",
    downloads: 15670,
    heat: 4890,
    likes: 1123,
    favorites: 678,
    coverImage: COVER_IMAGES[7],
    createdAt: "2023-12-05",
    updatedAt: "2024-03-05",
    status: "published",
    features: ["事件创建", "日程查询", "提醒设置", "多日历同步", "冲突检测"],
    usageExample: `calendar = CalendarManager()\nevents = calendar.list(date="2024-03-25")\ncalendar.create(\n  title="团队会议",\n  start="2024-03-25 14:00",\n  duration=60\n)`,
    inputOutput: {
      inputs: [
        { name: "action", type: "string", description: "操作类型" },
        { name: "event", type: "object", description: "事件信息" },
      ],
      outputs: [
        { name: "events", type: "array", description: "事件列表" },
        { name: "eventId", type: "string", description: "事件 ID" },
      ],
    },
    installSteps: [
      "下载 calendar-manager skill 包",
      "配置 Google/Outlook OAuth 凭证",
      "运行 agent skill install calendar-manager",
    ],
    changelog: [
      { version: "2.1.0", date: "2024-03-05", changes: ["新增 Outlook 支持", "添加冲突检测功能"] },
    ],
  },
  {
    id: "skill-009",
    name: "SQL Query Engine",
    description: "SQL 数据库查询 Skill，支持 MySQL、PostgreSQL、SQLite 等主流数据库",
    longDescription: "SQL Query Engine 为 Agent 提供安全的数据库查询能力，支持自然语言转 SQL，内置 SQL 注入防护，支持多种主流数据库。",
    tags: ["数据库", "SQL", "查询"],
    category: "数据工具",
    author: "DBMaster Pro",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DB&backgroundColor=f97316",
    version: "1.9.2",
    downloads: 19870,
    heat: 5670,
    likes: 1567,
    favorites: 834,
    coverImage: COVER_IMAGES[8],
    createdAt: "2024-01-30",
    updatedAt: "2024-03-12",
    status: "published",
    features: ["多数据库支持", "自然语言转 SQL", "SQL 注入防护", "查询结果格式化", "事务支持"],
    usageExample: `db = SQLQueryEngine(dsn="postgresql://...")\nresults = db.query("SELECT * FROM users WHERE age > 18")\nnl_result = db.nl_query("查找最近一周的订单")`,
    inputOutput: {
      inputs: [
        { name: "sql", type: "string", description: "SQL 查询语句" },
        { name: "params", type: "array", description: "查询参数" },
      ],
      outputs: [
        { name: "rows", type: "array", description: "查询结果行" },
        { name: "rowCount", type: "number", description: "结果行数" },
      ],
    },
    installSteps: [
      "下载 sql-query-engine skill 包",
      "配置数据库连接字符串",
      "运行 agent skill install sql-query-engine",
    ],
    changelog: [
      { version: "1.9.2", date: "2024-03-12", changes: ["修复 PostgreSQL 连接池泄漏", "优化查询性能"] },
    ],
  },
  {
    id: "skill-010",
    name: "Slack Integration",
    description: "Slack 消息集成 Skill，支持发送消息、创建频道、管理工作区",
    longDescription: "Slack Integration 让 Agent 能够与 Slack 工作区无缝交互，发送通知、管理频道、响应消息，实现团队协作自动化。",
    tags: ["Slack", "消息", "团队协作"],
    category: "通信工具",
    author: "CollabTools",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=CT&backgroundColor=7c3aed",
    version: "2.4.1",
    downloads: 23450,
    heat: 6120,
    likes: 1890,
    favorites: 1023,
    coverImage: COVER_IMAGES[9],
    createdAt: "2024-02-08",
    updatedAt: "2024-03-17",
    status: "published",
    features: ["消息发送", "频道管理", "文件上传", "Webhook 支持", "Bot 集成"],
    usageExample: `slack = SlackIntegration(token="xoxb-...")\nslack.send_message(\n  channel="#general",\n  text="任务已完成！"\n)\nslack.upload_file("#reports", "report.pdf")`,
    inputOutput: {
      inputs: [
        { name: "channel", type: "string", description: "频道名称或 ID" },
        { name: "message", type: "string", description: "消息内容" },
      ],
      outputs: [
        { name: "messageId", type: "string", description: "消息 ID" },
        { name: "timestamp", type: "string", description: "发送时间戳" },
      ],
    },
    installSteps: [
      "下载 slack-integration skill 包",
      "创建 Slack App 并获取 Bot Token",
      "运行 agent skill install slack-integration",
    ],
    changelog: [
      { version: "2.4.1", date: "2024-03-17", changes: ["支持 Slack Blocks 消息格式", "新增文件上传功能"] },
    ],
  },
  {
    id: "skill-011",
    name: "PDF Processor",
    description: "PDF 文档处理 Skill，支持解析、提取、合并、分割 PDF 文件",
    longDescription: "PDF Processor 提供全面的 PDF 处理能力，包括文本提取、表格识别、页面操作等，让 Agent 能够高效处理 PDF 文档。",
    tags: ["PDF", "文档处理", "文字提取"],
    category: "文件工具",
    author: "DocFlow AI",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DF&backgroundColor=dc2626",
    version: "1.6.0",
    downloads: 16780,
    heat: 4560,
    likes: 1234,
    favorites: 654,
    coverImage: COVER_IMAGES[10],
    createdAt: "2023-11-15",
    updatedAt: "2024-02-20",
    status: "published",
    features: ["文本提取", "表格识别", "页面合并", "PDF 分割", "水印添加"],
    usageExample: `pdf = PDFProcessor()\ntext = pdf.extract_text("document.pdf")\ntables = pdf.extract_tables("report.pdf")\npdf.merge(["part1.pdf", "part2.pdf"], "merged.pdf")`,
    inputOutput: {
      inputs: [
        { name: "file", type: "string", description: "PDF 文件路径" },
        { name: "pages", type: "array", description: "页面范围" },
      ],
      outputs: [
        { name: "text", type: "string", description: "提取的文本" },
        { name: "tables", type: "array", description: "提取的表格数据" },
      ],
    },
    installSteps: [
      "下载 pdf-processor skill 包",
      "安装 pdfplumber 依赖",
      "运行 agent skill install pdf-processor",
    ],
    changelog: [
      { version: "1.6.0", date: "2024-02-20", changes: ["新增表格识别功能", "提升文字提取准确率"] },
    ],
  },
  {
    id: "skill-012",
    name: "Weather Service",
    description: "天气查询 Skill，支持实时天气、预报、历史数据查询",
    longDescription: "Weather Service 为 Agent 提供准确的天气数据，支持全球城市的实时天气、未来预报和历史数据查询，数据来源于多个气象服务。",
    tags: ["天气", "气象", "实时数据"],
    category: "信息获取",
    author: "WeatherBot",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=WB&backgroundColor=0ea5e9",
    version: "3.2.0",
    downloads: 12340,
    heat: 3890,
    likes: 987,
    favorites: 456,
    coverImage: COVER_IMAGES[11],
    createdAt: "2023-10-20",
    updatedAt: "2024-03-01",
    status: "published",
    features: ["实时天气", "7天预报", "历史数据", "空气质量", "灾害预警"],
    usageExample: `weather = WeatherService()\ncurrent = weather.current("北京")\nforecast = weather.forecast("上海", days=7)\nprint(current.temperature, current.description)`,
    inputOutput: {
      inputs: [
        { name: "city", type: "string", description: "城市名称" },
        { name: "days", type: "number", description: "预报天数" },
      ],
      outputs: [
        { name: "temperature", type: "number", description: "温度（摄氏度）" },
        { name: "description", type: "string", description: "天气描述" },
        { name: "forecast", type: "array", description: "预报数据" },
      ],
    },
    installSteps: [
      "下载 weather-service skill 包",
      "配置天气 API Key",
      "运行 agent skill install weather-service",
    ],
    changelog: [
      { version: "3.2.0", date: "2024-03-01", changes: ["新增空气质量数据", "支持更多城市"] },
    ],
  },
];

export const CATEGORIES = [
  "全部",
  "信息获取",
  "代码工具",
  "文件工具",
  "数据工具",
  "通信工具",
  "自动化工具",
  "AI 工具",
  "生产力工具",
];

export const HOT_SEARCH_TERMS = [
  "网络搜索",
  "代码执行",
  "文件管理",
  "数据分析",
  "邮件发送",
  "浏览器自动化",
  "图像识别",
  "日历管理",
];

export const MOCK_USER = {
  id: "user-001",
  name: "张三",
  email: "zhangsan@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan&backgroundColor=b6e3f4",
  mySkills: ["skill-001", "skill-006"],
  favorites: ["skill-002", "skill-004", "skill-007"],
};
