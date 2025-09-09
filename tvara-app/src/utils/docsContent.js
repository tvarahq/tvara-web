export const docsContent = {
  "anchor-0-0": {
    title: "Getting Started",
    subtitle: "Welcome to Tvara SDK Documentation",
    content: [
      {
        type: "text",
        content: "Tvara is a powerful Python SDK for building intelligent, multi-agent AI workflows with minimal boilerplate. Unlike traditional frameworks, Tvara emphasizes plug-and-play simplicity with native Composio integration, offering access to 10,000+ tools and services through a unified interface."
      },
      {
        type: "text",
        content: "Whether you're building personal automation, customer support systems, or complex agentic applications, Tvara lets you focus on what your agents do, not how to wire them together."
      },
      {
        type: "list",
        items: [
          "Smart AI Agents with multiple LLM provider support",
          "10,000+ tools through native Composio integration",
          "Multi-agent workflows with sequential and supervised modes",
          "Smart authentication caching with configurable expiry",
          "Flexible prompting with templates and raw prompts",
          "Rich logging with colored console output"
        ]
      }
    ]
  },
  "anchor-0-1": {
    title: "Installation",
    subtitle: "Set up Tvara in your environment",
    content: [
      {
        type: "text",
        content: "Installing Tvara is straightforward using pip. Ensure you have Python 3.9 or higher installed on your system."
      },
      {
        type: "code",
        language: "bash",
        content: "pip install tvara"
      },
      {
        type: "text",
        content: "After installation, you'll need to set up your environment variables for API keys. Create a .env file in your project root with the required credentials."
      },
      {
        type: "list",
        items: [
          "Python 3.9 or higher required",
          "Support for Gemini, OpenAI, and Anthropic models",
          "Native Composio integration for 10,000+ tools",
          "Zero configuration for basic agent setup",
          "Environment variable configuration support"
        ]
      }
    ]
  },
  "anchor-0-2": {
    title: "Quick Start",
    subtitle: "Create your first agent in minutes",
    content: [
      {
        type: "text",
        content: "Get started with Tvara by creating a simple agent. This example shows how to create a basic agent without any external tools."
      },
      {
        type: "code",
        language: "python",
        content: "from tvara.core import Agent\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()\n\n# Simple agent without tools\nagent = Agent(\n    name=\"MyAgent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n)\n\nresponse = agent.run(\"Hi, how are you?\")\nprint(response)"
      },
      {
        type: "text",
        content: "For agents with tool capabilities, add Composio integration to access thousands of external services and APIs."
      },
      {
        type: "code",
        language: "python",
        content: "# Agent with Notion integration\nnotion_agent = Agent(\n    name=\"My Notion Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    composio_api_key=os.getenv(\"COMPOSIO_API_KEY\"),\n    composio_toolkits=[\"notion\"],\n)\n\nresponse = notion_agent.run(\"Summarize my 'Project Ideas' page from Notion\")\nprint(response)"
      }
    ]
  },
  "anchor-1-0": {
    title: "Agents",
    subtitle: "Understanding Tvara's Agent architecture",
    content: [
      {
        type: "text",
        content: "Agents are the core building blocks of Tvara. Each agent can be configured with specific models, tools, and behaviors to handle different aspects of your workflow."
      },
      {
        type: "text",
        content: "Tvara supports multiple LLM providers including Gemini, OpenAI, and Anthropic. Agents can be equipped with any combination of Composio's 10,000+ tools for enhanced capabilities."
      },
      {
        type: "list",
        items: [
          "Multiple LLM provider support (Gemini, OpenAI, Anthropic)",
          "Composio toolkit integration for external tool access",
          "Custom prompt templates and raw prompt support",
          "Authentication caching for seamless tool usage",
          "Configurable iteration limits and retry mechanisms",
          "Rich logging and debugging capabilities"
        ]
      }
    ]
  },
  "anchor-1-1": {
    title: "Agent Configuration",
    subtitle: "Advanced agent setup and customization",
    content: [
      {
        type: "text",
        content: "Agents can be extensively customized with prompts, toolkits, authentication settings, and execution parameters to match your specific use case."
      },
      {
        type: "code",
        language: "python",
        content: "from tvara.core import Agent, Prompt\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()\n\n# Custom prompt with multiple toolkits\ncustom_prompt = Prompt(\n    raw_prompt=\"You are an anxious AI assistant who helps with tasks but worries about everything. Use tools when necessary.\"\n)\n\nmulti_tool_agent = Agent(\n    name=\"Multi-Tool Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    composio_api_key=os.getenv(\"COMPOSIO_API_KEY\"),\n    composio_toolkits=[\"COMPOSIO_SEARCH\", \"slack\"],\n    prompt=custom_prompt,\n    max_iterations=15,\n    cache_auth=True,\n    cache_validity_minutes=30\n)"
      },
      {
        type: "text",
        content: "Authentication caching prevents repeated OAuth flows, improving performance and user experience. Cache settings can be customized per agent based on security requirements."
      }
    ]
  },
  "anchor-1-2": {
    title: "Supported Models",
    subtitle: "Available LLM providers and models",
    content: [
      {
        type: "text",
        content: "Tvara supports three major LLM providers, each offering different strengths for various use cases. Choose the model that best fits your performance, cost, and capability requirements."
      },
      {
        type: "code",
        language: "python",
        content: "# Gemini models\nagent_gemini = Agent(\n    name=\"Gemini Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"GEMINI_API_KEY\")\n)\n\n# OpenAI models\nagent_openai = Agent(\n    name=\"OpenAI Agent\",\n    model=\"gpt-4\",\n    api_key=os.getenv(\"OPENAI_API_KEY\")\n)\n\n# Anthropic models\nagent_claude = Agent(\n    name=\"Claude Agent\",\n    model=\"claude-3-sonnet\",\n    api_key=os.getenv(\"ANTHROPIC_API_KEY\")\n)"
      },
      {
        type: "list",
        items: [
          "Gemini: Fast, cost-effective for most tasks",
          "OpenAI: Industry standard with broad capabilities",
          "Anthropic: Excellent reasoning and safety features",
          "Easy model switching without code changes",
          "Consistent API across all providers"
        ]
      }
    ]
  },
  "anchor-2-0": {
    title: "Workflows",
    subtitle: "Orchestrating multi-agent systems",
    content: [
      {
        type: "text",
        content: "Workflows enable you to coordinate multiple agents to handle complex tasks that require different specializations. Tvara supports two primary workflow modes: sequential and supervised."
      },
      {
        type: "text",
        content: "Sequential workflows are perfect for data processing pipelines where each agent builds on the previous output. Supervised workflows provide dynamic decision-making with a manager agent coordinating specialized workers."
      },
      {
        type: "list",
        items: [
          "Sequential mode: Linear processing pipeline",
          "Supervised mode: Dynamic agent coordination",
          "WorkflowResult object with detailed execution data",
          "Agent output tracking and debugging",
          "Configurable iteration limits and error handling",
          "Dynamic agent addition and removal"
        ]
      }
    ]
  },
  "anchor-2-1": {
    title: "Sequential Workflows",
    subtitle: "Linear processing pipelines",
    content: [
      {
        type: "text",
        content: "Sequential workflows execute agents in a predefined order, with each agent receiving the output from the previous agent as input. This pattern is ideal for data transformation, content creation pipelines, and multi-step analysis tasks."
      },
      {
        type: "code",
        language: "python",
        content: "from tvara.core import Agent, Workflow, Prompt\nimport os\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\n# Research agent with web search\nresearcher_agent = Agent(\n    name=\"Researcher Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    prompt=Prompt(\n        raw_prompt=\"You are a researcher. Gather comprehensive information on the given topic and provide detailed insights.\"\n    ),\n    composio_api_key=os.getenv(\"COMPOSIO_API_KEY\"),\n    composio_toolkits=[\"COMPOSIO_SEARCH\"]\n)\n\n# Blog writer agent\nblog_agent = Agent(\n    name=\"Blog Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    prompt=Prompt(\n        raw_prompt=\"You are a professional blog writer. Create engaging, well-structured content from research data.\"\n    )\n)\n\n# Create sequential workflow\nresearch_workflow = Workflow(\n    name=\"Research to Blog Pipeline\",\n    agents=[researcher_agent, blog_agent],\n    mode=\"sequential\",\n    max_iterations=5,\n)\n\nresult = research_workflow.run(\"Write a comprehensive blog post about quantum computing\")\nprint(f\"Final Output: {result.final_output}\")"
      },
      {
        type: "text",
        content: "Sequential workflows automatically pass outputs between agents, maintaining context and building upon previous work to create comprehensive results."
      }
    ]
  },
  "anchor-2-2": {
    title: "Supervised Workflows",
    subtitle: "Dynamic agent coordination with manager oversight",
    content: [
      {
        type: "text",
        content: "Supervised workflows use a manager agent to coordinate specialized worker agents. The manager analyzes the request and dynamically decides which agents to use and in what order, making this pattern ideal for complex, unpredictable tasks."
      },
      {
        type: "code",
        language: "python",
        content: "from tvara.core import Agent, Workflow, Prompt\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()\n\n# Specialized worker agents\nweather_agent = Agent(\n    name=\"Weather Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    composio_api_key=os.getenv(\"COMPOSIO_API_KEY\"),\n    composio_toolkits=[\"WEATHERMAP\"],\n)\n\npoet_agent = Agent(\n    name=\"Poet Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    prompt=Prompt(\n        raw_prompt=\"You are a creative poet who writes beautiful, evocative poetry about any topic.\"\n    )\n)\n\ngmail_agent = Agent(\n    name=\"Gmail Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    composio_api_key=os.getenv(\"COMPOSIO_API_KEY\"),\n    composio_toolkits=[\"gmail\"]\n)\n\n# Manager agent for coordination\nmanager_agent = Agent(\n    name=\"Manager Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    prompt=Prompt(\n        raw_prompt=\"You are a workflow manager coordinating multiple AI agents. Analyze requests and delegate tasks efficiently.\"\n    )\n)\n\n# Create supervised workflow\ncreative_workflow = Workflow(\n    name=\"Weather Poetry Email\",\n    agents=[weather_agent, poet_agent, gmail_agent],\n    mode=\"supervised\",\n    manager_agent=manager_agent,\n    max_iterations=10\n)\n\nresult = creative_workflow.run(\"Get San Francisco weather, write a poem about it, and email it to team@tvarahq.com\")"
      },
      {
        type: "text",
        content: "The manager agent intelligently coordinates worker agents, making real-time decisions about task delegation and execution order based on the specific requirements of each request."
      }
    ]
  },
  "anchor-3-0": {
    title: "Tools & Integrations",
    subtitle: "Access to 10,000+ tools via Composio",
    content: [
      {
        type: "text",
        content: "Tvara provides seamless access to thousands of tools and services through Composio integration. Tools are organized into toolkits that can be easily added to any agent without complex configuration."
      },
      {
        type: "text",
        content: "Some toolkits require no authentication and work immediately, while others require OAuth setup for secure access to external services. Tvara handles authentication caching automatically."
      },
      {
        type: "list",
        items: [
          "No-auth toolkits: COMPOSIO_SEARCH, CODEINTERPRETER, WEATHERMAP, HACKERNEWS",
          "Productivity: github, slack, gmail, notion, google_calendar, google_drive",
          "Social Media: twitter, linkedin, facebook, instagram",
          "Project Management: trello, asana, jira, monday, clickup",
          "Development: gitlab, bitbucket, docker, aws, gcp, azure",
          "Communication: zoom, discord, teams, whatsapp"
        ]
      }
    ]
  },
  "anchor-3-1": {
    title: "Authentication & Caching",
    subtitle: "Secure and efficient tool access",
    content: [
      {
        type: "text",
        content: "Tvara includes smart authentication caching to avoid repeated OAuth flows and improve performance. Authentication tokens are securely cached with configurable expiry times."
      },
      {
        type: "code",
        language: "python",
        content: "# Enable caching with custom validity\nagent = Agent(\n    name=\"Cached Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    composio_api_key=os.getenv(\"COMPOSIO_API_KEY\"),\n    composio_toolkits=[\"github\", \"slack\"],\n    cache_auth=True,  # Enable caching\n    cache_validity_minutes=30,  # Cache for 30 minutes\n)\n\n# Check cache status\ncache_status = agent.get_auth_cache_status()\nprint(cache_status)\n\n# Clear cache manually\nagent.clear_auth_cache()"
      },
      {
        type: "text",
        content: "The cache automatically expires after the specified validity period, ensuring that stale tokens are not used. Cache is stored locally in the ./cache/ directory by default."
      },
      {
        type: "list",
        items: [
          "Automatic OAuth flow handling",
          "Configurable cache expiry (default 10 minutes)",
          "Secure local cache storage",
          "Manual cache management methods",
          "Per-agent cache configuration"
        ]
      }
    ]
  },
  "anchor-4-0": {
    title: "Configuration",
    subtitle: "Environment and runtime configuration",
    content: [
      {
        type: "text",
        content: "Tvara uses environment variables for secure configuration management. Create a .env file in your project root to store API keys and other sensitive configuration data."
      },
      {
        type: "code",
        language: "bash",
        content: "# Required: LLM API Keys\nMODEL_API_KEY=your_gemini_or_openai_or_claude_key\n\n# Required for tools: Composio API Key\nCOMPOSIO_API_KEY=your_composio_api_key\n\n# Optional: Custom cache settings\nTVARA_CACHE_DIR=./custom_cache\nTVARA_DEFAULT_CACHE_VALIDITY=20"
      },
      {
        type: "text",
        content: "To get a Composio API key, visit the Composio Developer Portal, sign up or log in, navigate to Dashboard → API Keys, and generate a new key."
      },
      {
        type: "list",
        items: [
          "Environment variable-based configuration",
          "Secure API key management",
          "Composio Developer Portal integration",
          "Custom cache directory settings",
          "Runtime configuration support"
        ]
      }
    ]
  },
  "anchor-4-1": {
    title: "Custom Prompts",
    subtitle: "Template and raw prompt configuration",
    content: [
      {
        type: "text",
        content: "Tvara supports both template-based and raw prompts to give you maximum flexibility in defining agent behavior. Templates provide consistency while raw prompts offer complete customization."
      },
      {
        type: "code",
        language: "python",
        content: "from tvara.core import Prompt\nfrom tvara.utils.prompt_templates import template_registry\n\n# Using built-in templates\nbasic_prompt = Prompt(template_name=\"basic_prompt_template\")\nagent_prompt = Prompt(template_name=\"agent_prompt_template\")\n\n# Custom raw prompts\ncustom_prompt = Prompt(\n    raw_prompt=\"\"\"You are a helpful AI assistant specialized in data analysis.\n    You should be thorough, accurate, and provide actionable insights.\n    Always cite sources when using external data.\"\"\"\n)\n\n# View available templates\nprint(\"Available templates:\", list(template_registry.keys()))"
      },
      {
        type: "text",
        content: "Custom prompts allow you to define specific agent personalities, expertise areas, and behavioral guidelines that align with your application's requirements."
      }
    ]
  },
  "anchor-5-0": {
    title: "Workflow Management",
    subtitle: "Managing and monitoring workflow execution",
    content: [
      {
        type: "text",
        content: "Tvara provides comprehensive workflow management capabilities including dynamic agent management, detailed result tracking, and execution monitoring."
      },
      {
        type: "code",
        language: "python",
        content: "# Workflow management methods\nworkflow = Workflow(\n    name=\"My Workflow\",\n    agents=[agent1, agent2],\n    mode=\"sequential\"\n)\n\n# Add/remove agents dynamically\nworkflow.add_agent(new_agent)\nworkflow.remove_agent(\"Agent Name\")\n\n# Get workflow summary\nsummary = workflow.get_workflow_summary()\nprint(summary)\n# Output: {\n#     \"name\": \"My Workflow\",\n#     \"mode\": \"sequential\", \n#     \"agent_count\": 2,\n#     \"agent_names\": [\"Agent1\", \"Agent2\"],\n#     \"has_manager\": False,\n#     \"max_iterations\": 10\n# }"
      },
      {
        type: "text",
        content: "Every workflow execution returns a WorkflowResult object containing success status, final output, error information, and detailed agent execution logs."
      },
      {
        type: "list",
        items: [
          "Dynamic agent addition and removal",
          "Comprehensive workflow summaries",
          "WorkflowResult object with execution details",
          "Agent output tracking and debugging",
          "Error handling and recovery mechanisms"
        ]
      }
    ]
  },
  "anchor-5-1": {
    title: "Result Handling",
    subtitle: "Working with workflow results and outputs",
    content: [
      {
        type: "text",
        content: "The WorkflowResult object provides comprehensive information about workflow execution, including success status, outputs from each agent, and detailed error information when issues occur."
      },
      {
        type: "code",
        language: "python",
        content: "result = workflow.run(\"Your request here\")\n\n# Access results\nprint(f\"Success: {result.success}\")\nprint(f\"Final Output: {result.final_output}\")\nprint(f\"Error (if any): {result.error}\")\n\n# Detailed agent outputs\nfor output in result.agent_outputs:\n    print(f\"Agent: {output['agent_name']}\")\n    print(f\"Input: {output['input']}\")\n    print(f\"Output: {output['output']}\")\n    print(f\"Step: {output.get('step', 'N/A')}\")"
      },
      {
        type: "text",
        content: "Result objects enable detailed debugging, performance analysis, and workflow optimization by providing visibility into each step of the execution process."
      }
    ]
  },
  "anchor-6-0": {
    title: "Best Practices",
    subtitle: "Guidelines for effective Tvara usage",
    content: [
      {
        type: "text",
        content: "Following these best practices will help you build more reliable, maintainable, and efficient agent workflows with Tvara."
      },
      {
        type: "text",
        content: "**Agent Design:** Use descriptive names for agents and workflows, provide clear and specific prompts for better performance, limit toolkits to what's actually needed, and set appropriate max_iterations based on task complexity."
      },
      {
        type: "text",
        content: "**Authentication Management:** Use environment variables for API keys, enable caching for frequently used toolkits, set reasonable cache expiry times, and clear cache when switching between different accounts."
      },
      {
        type: "code",
        language: "python",
        content: "# Error handling example\ntry:\n    result = workflow.run(\"Complex task\")\n    if result.success:\n        print(f\"Success: {result.final_output}\")\n    else:\n        print(f\"Workflow failed: {result.error}\")\nexcept Exception as e:\n    print(f\"Execution error: {e}\")"
      },
      {
        type: "list",
        items: [
          "Use descriptive agent and workflow names",
          "Provide clear, specific prompts for better performance",
          "Implement proper error handling and result validation",
          "Enable authentication caching for better performance",
          "Monitor agent outputs for debugging and optimization",
          "Set appropriate iteration limits based on task complexity"
        ]
      }
    ]
  },
  "anchor-6-1": {
    title: "Debugging & Monitoring",
    subtitle: "Troubleshooting and performance optimization",
    content: [
      {
        type: "text",
        content: "Tvara provides rich console logging with color-coded output to help you monitor execution and debug issues. Different types of operations are highlighted with distinct colors and emojis."
      },
      {
        type: "text",
        content: "Logging Categories: 🤖 Blue for agent initialization, ✅ Green for successful operations, ⚠️ Yellow for warnings, ❌ Red for errors, 🔧 Cyan for tool operations, and 👨‍💼 Purple for manager decisions."
      },
      {
        type: "code",
        language: "python",
        content: "# Enable/disable detailed logging\nworkflow = Workflow(\n    name=\"Debug Workflow\",\n    agents=[agent],\n    enable_logging=True  # Set to False for quiet mode\n)\n\n# Access detailed execution information\nresult = workflow.run(\"Task with detailed monitoring\")\nfor step in result.agent_outputs:\n    print(f\"Step {step.get('step', 'N/A')}: {step['agent_name']}\")\n    print(f\"Success: {step.get('success', True)}\")\n    print(f\"Duration: {step.get('duration', 'N/A')}\")"
      },
      {
        type: "text",
        content: "Use the detailed logging and result objects to identify bottlenecks, optimize agent performance, and troubleshoot complex workflow issues."
      }
    ]
  },
  "anchor-7-0": {
    title: "Examples & Use Cases",
    subtitle: "Real-world applications and code samples",
    content: [
      {
        type: "text",
        content: "Tvara excels in various real-world scenarios, from simple automation tasks to complex multi-agent systems. Here are some common patterns and use cases."
      },
      {
        type: "text",
        content: "**Content Creation Pipeline:** Research → Writing → Review → Publishing. Use sequential workflows to create high-quality content with fact-checking and editing stages."
      },
      {
        type: "text",
        content: "**Customer Support Automation:** Query classification → Specialized response → Follow-up actions. Use supervised workflows to handle diverse customer inquiries with appropriate routing."
      },
      {
        type: "code",
        language: "python",
        content: "# Multi-toolkit productivity agent\nproductivity_agent = Agent(\n    name=\"Productivity Assistant\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    composio_api_key=os.getenv(\"COMPOSIO_API_KEY\"),\n    composio_toolkits=[\n        \"github\",           # Code management\n        \"slack\",            # Team communication  \n        \"google_calendar\",  # Scheduling\n        \"notion\",           # Documentation\n        \"gmail\"             # Email\n    ],\n)\n\nresponse = productivity_agent.run(\n    \"Check my calendar for tomorrow, create a GitHub issue for the bug report in Slack, and send a status update email\"\n)"
      },
      {
        type: "list",
        items: [
          "Personal automation and task management",
          "Content creation and publishing pipelines",
          "Customer support and query routing",
          "Data analysis and reporting workflows",
          "Development and deployment automation",
          "Social media management and scheduling"
        ]
      }
    ]
  },
  "anchor-7-1": {
    title: "Advanced Features",
    subtitle: "Exploring Tvara's advanced capabilities",
    content: [
      {
        type: "text",
        content: "Tvara includes several advanced features designed for production use cases and complex workflow requirements."
      },
      {
        type: "text",
        content: "**Coming Soon:** Visual workflow builder for drag-and-drop interface design, advanced orchestration patterns including parallel and conditional execution, deployment tools for one-click cloud deployment, and enhanced observability with real-time monitoring dashboards."
      },
      {
        type: "code",
        language: "python",
        content: "# Advanced agent with custom settings\nadvanced_agent = Agent(\n    name=\"Production Agent\",\n    model=\"gemini-2.5-flash\",\n    api_key=os.getenv(\"MODEL_API_KEY\"),\n    composio_api_key=os.getenv(\"COMPOSIO_API_KEY\"),\n    composio_toolkits=[\"github\", \"slack\", \"notion\"],\n    prompt=custom_prompt,\n    max_iterations=20,\n    cache_auth=True,\n    cache_validity_minutes=60,\n    enable_retry=True,\n    retry_attempts=3\n)"
      },
      {
        type: "list",
        items: [
          "Robust error handling with intelligent retry mechanisms",
          "Configurable iteration limits and timeouts",
          "Authentication caching for improved performance",
          "Rich logging and execution tracking",
          "Custom tool development SDK (coming soon)",
          "Horizontal scaling support for high-volume applications"
        ]
      }
    ]
  },
  "anchor-8-0": {
    title: "FAQ",
    subtitle: "Frequently asked questions",
    content: [
      {
        type: "text",
        content: "Here are answers to the most common questions about Tvara. For additional support, join our Slack community or check the GitHub repository for the latest updates."
      },
      {
        type: "text",
        content: "**Q: What makes Tvara different from other AI frameworks?**\nA: Tvara focuses on plug-and-play simplicity with native Composio integration, providing access to 10,000+ tools out of the box. No complex setup or boilerplate code required."
      },
      {
        type: "text",
        content: "**Q: Can I use multiple LLM providers in the same workflow?**\nA: Yes! Each agent can use a different model provider. You can mix Gemini, OpenAI, and Anthropic models within the same workflow based on specific requirements."
      },
      {
        type: "text",
        content: "**Q: How does authentication caching work?**\nA: Tvara automatically caches OAuth tokens locally with configurable expiry times. This prevents repeated authentication flows and improves performance while maintaining security."
      },
      {
        type: "list",
        items: [
          "Compatible with existing Python applications",
          "Minimal system requirements (Python 3.9+)",
          "Horizontal scaling support for production use",
          "Container-ready with Docker support",
          "MIT license for commercial and open source projects"
        ]
      }
    ]
  },
  "anchor-8-1": {
    title: "Troubleshooting",
    subtitle: "Common issues and solutions",
    content: [
      {
        type: "text",
        content: "This section covers common issues you might encounter while using Tvara and provides step-by-step solutions to resolve them quickly."
      },
      {
        type: "text",
        content: "**Installation Issues:** Ensure you have Python 3.9+ installed. If you encounter dependency conflicts, consider using a virtual environment or conda environment for isolation."
      },
      {
        type: "text",
        content: "**Authentication Errors:** Verify your API keys are correctly set in the .env file. For Composio tools, ensure you've completed the OAuth flow for the required services."
      },
      {
        type: "code",
        language: "bash",
        content: "# Check Python version\npython --version\n# Should be 3.9 or higher\n\n# Verify environment variables\necho $MODEL_API_KEY\necho $COMPOSIO_API_KEY\n\n# Check Tvara installation\npip show tvara"
      },
      {
        type: "text",
        content: "**Performance Issues:** Enable authentication caching to reduce OAuth overhead. Set appropriate max_iterations to prevent infinite loops. Monitor agent outputs to identify bottlenecks in your workflow."
      },
      {
        type: "list",
        items: [
          "Python version compatibility (3.9+ required)",
          "Virtual environment setup for dependency isolation",
          "API key validation and environment variable setup",
          "Composio OAuth flow completion for authenticated tools",
          "Authentication cache troubleshooting and management",
          "Performance optimization through caching and iteration limits"
        ]
      }
    ]
  },
  "anchor-9-0": {
    title: "Community & Support",
    subtitle: "Get help and contribute to Tvara",
    content: [
      {
        type: "text",
        content: "Tvara has an active community of developers building intelligent automation systems. Join us to get help, share your projects, and contribute to the ecosystem."
      },
      {
        type: "text",
        content: "**Contributing:** We welcome contributions of all kinds - bug reports, feature requests, code contributions, documentation improvements, and community support. Check our Contributing Guide for detailed guidelines."
      },
      {
        type: "text",
        content: "**Support Channels:** Join our Slack workspace for real-time help and discussions. Report issues on GitHub with detailed reproduction steps. Browse examples in the repository for inspiration and learning."
      },
      {
        type: "list",
        items: [
          "Active Slack community for real-time support",
          "GitHub repository for issues and contributions",
          "Comprehensive examples directory",
          "Regular community showcases and demos",
          "Open source development with MIT license",
          "Roadmap discussions and feature planning"
        ]
      }
    ]
  },
  "anchor-9-1": {
    title: "Roadmap & Future",
    subtitle: "What's coming next for Tvara",
    content: [
      {
        type: "text",
        content: "Tvara is actively developed with exciting features planned for upcoming releases. Our roadmap focuses on developer experience, enterprise capabilities, and expanded integration options."
      },
      {
        type: "text",
        content: "**Visual Workflow Builder:** Drag-and-drop interface for designing complex workflows without writing code. Perfect for non-technical users and rapid prototyping."
      },
      {
        type: "text",
        content: "**Advanced Orchestration:** Parallel execution, conditional logic, and event-driven workflows. Enhanced error handling with circuit breaker patterns and graceful degradation."
      },
      {
        type: "text",
        content: "**Deployment & Observability:** One-click deployment to major cloud platforms, real-time monitoring dashboards, performance analytics, and cost optimization tools."
      },
      {
        type: "list",
        items: [
          "Visual workflow builder with drag-and-drop interface",
          "Parallel and conditional execution modes",
          "One-click cloud deployment tools",
          "Real-time monitoring and analytics dashboard",
          "Custom tool development SDK",
          "Enterprise features: SSO, audit logging, compliance tools"
        ]
      }
    ]
  }
};