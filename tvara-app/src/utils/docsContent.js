export const docsContent = {
  "anchor-0-0": {
    title: "Getting Started",
    subtitle: "Welcome to Tvara Documentation",
    content: [
      {
        type: "text",
        content: "Tvara is a powerful platform designed to streamline your development workflow. This documentation will guide you through every aspect of using Tvara effectively, from initial setup to advanced features."
      },
      {
        type: "text",
        content: "Whether you're a beginner or an experienced developer, you'll find comprehensive guides, tutorials, and reference materials to help you make the most of Tvara's capabilities."
      },
      {
        type: "list",
        items: [
          "Complete installation guide",
          "Step-by-step tutorials",
          "Best practices and examples",
          "Troubleshooting and support"
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
        content: "Installing Tvara is straightforward and can be done in multiple ways depending on your preferred development environment and package manager."
      },
      {
        type: "code",
        language: "bash",
        content: "npm install tvara\n# or\nyarn add tvara\n# or\npnpm add tvara"
      },
      {
        type: "text",
        content: "After installation, you'll need to initialize Tvara in your project. Create a configuration file and set up your environment variables."
      },
      {
        type: "list",
        items: [
          "Node.js version 16 or higher required",
          "Supports TypeScript out of the box",
          "Compatible with all major frameworks",
          "Zero configuration for quick start"
        ]
      }
    ]
  },
  "anchor-0-2": {
    title: "Quick Start",
    subtitle: "Get up and running in minutes",
    content: [
      {
        type: "text",
        content: "This quick start guide will have you running your first Tvara project in under 5 minutes. Follow these simple steps to see Tvara in action."
      },
      {
        type: "code",
        language: "javascript",
        content: "import { Tvara } from 'tvara';\n\nconst app = new Tvara({\n  port: 3000,\n  environment: 'development'\n});\n\napp.start();"
      },
      {
        type: "text",
        content: "Once your application is running, you can access the dashboard at localhost:3000 and begin exploring Tvara's features immediately."
      }
    ]
  },
  "anchor-1-0": {
    title: "API Overview",
    subtitle: "Understanding Tvara's API structure",
    content: [
      {
        type: "text",
        content: "Tvara provides a comprehensive RESTful API that follows industry standards and best practices. Our API is designed to be intuitive, well-documented, and easy to integrate with existing systems."
      },
      {
        type: "text",
        content: "All API endpoints return JSON responses and use standard HTTP status codes. Authentication is handled through API keys or OAuth 2.0, depending on your use case."
      },
      {
        type: "list",
        items: [
          "RESTful design principles",
          "Consistent response formats",
          "Comprehensive error handling",
          "Rate limiting and throttling",
          "Versioning support"
        ]
      }
    ]
  },
  "anchor-1-1": {
    title: "Authentication",
    subtitle: "Secure your API requests",
    content: [
      {
        type: "text",
        content: "Tvara supports multiple authentication methods to ensure your data remains secure while providing flexibility for different integration scenarios."
      },
      {
        type: "code",
        language: "javascript",
        content: "// API Key Authentication\nconst response = await fetch('/api/v1/data', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  }\n});"
      },
      {
        type: "text",
        content: "For production applications, we recommend using OAuth 2.0 with proper token management and refresh mechanisms."
      },
      {
        type: "list",
        items: [
          "API Key authentication for simple use cases",
          "OAuth 2.0 for production applications",
          "JWT tokens with configurable expiration",
          "Role-based access control (RBAC)",
          "Multi-factor authentication support"
        ]
      }
    ]
  },
  "anchor-1-2": {
    title: "Endpoints",
    subtitle: "Available API endpoints and methods",
    content: [
      {
        type: "text",
        content: "Tvara's API is organized into logical groups of endpoints, each serving specific functionality. All endpoints support standard HTTP methods where appropriate."
      },
      {
        type: "code",
        language: "bash",
        content: "# Users\nGET    /api/v1/users\nPOST   /api/v1/users\nGET    /api/v1/users/:id\nPUT    /api/v1/users/:id\nDELETE /api/v1/users/:id\n\n# Projects\nGET    /api/v1/projects\nPOST   /api/v1/projects\nGET    /api/v1/projects/:id"
      },
      {
        type: "text",
        content: "Each endpoint includes detailed documentation with request/response examples, parameter descriptions, and error codes."
      }
    ]
  },
  "anchor-2-0": {
    title: "Configuration",
    subtitle: "Customize Tvara for your needs",
    content: [
      {
        type: "text",
        content: "Tvara offers extensive configuration options to adapt to your specific requirements. Configuration can be managed through files, environment variables, or programmatically."
      },
      {
        type: "code",
        language: "json",
        content: "{\n  \"server\": {\n    \"port\": 3000,\n    \"host\": \"localhost\",\n    \"ssl\": false\n  },\n  \"database\": {\n    \"type\": \"postgresql\",\n    \"host\": \"localhost\",\n    \"port\": 5432\n  },\n  \"logging\": {\n    \"level\": \"info\",\n    \"format\": \"json\"\n  }\n}"
      },
      {
        type: "list",
        items: [
          "File-based configuration (JSON, YAML)",
          "Environment variable support",
          "Runtime configuration changes",
          "Configuration validation",
          "Multiple environment support"
        ]
      }
    ]
  },
  "anchor-2-1": {
    title: "Environment Variables",
    subtitle: "Configure using environment variables",
    content: [
      {
        type: "text",
        content: "Environment variables provide a secure and flexible way to configure Tvara across different deployment environments without changing code."
      },
      {
        type: "code",
        language: "bash",
        content: "# Database Configuration\nTVARA_DB_HOST=localhost\nTVARA_DB_PORT=5432\nTVARA_DB_NAME=tvara\nTVARA_DB_USER=admin\nTVARA_DB_PASSWORD=secretpassword\n\n# Server Configuration\nTVARA_PORT=3000\nTVARA_HOST=0.0.0.0\nTVARA_SSL_ENABLED=true"
      },
      {
        type: "text",
        content: "All configuration options have corresponding environment variables following the TVARA_ prefix convention. This ensures consistency and prevents conflicts with other applications."
      }
    ]
  },
  "anchor-3-0": {
    title: "FAQ",
    subtitle: "Frequently asked questions",
    content: [
      {
        type: "text",
        content: "Here are answers to the most common questions about Tvara. If you can't find what you're looking for, please check our community forum or contact support."
      },
      {
        type: "text",
        content: "**Q: Is Tvara compatible with my existing infrastructure?**\nA: Tvara is designed to integrate seamlessly with most existing systems. It supports standard protocols and can be deployed alongside your current applications."
      },
      {
        type: "text",
        content: "**Q: What are the system requirements?**\nA: Tvara requires Node.js 16+, 2GB RAM minimum (4GB recommended), and supports all major operating systems including Linux, macOS, and Windows."
      },
      {
        type: "list",
        items: [
          "Cross-platform compatibility",
          "Minimal resource requirements",
          "Horizontal scaling support",
          "Container-ready deployment",
          "Cloud provider integration"
        ]
      }
    ]
  },
  "anchor-3-1": {
    title: "Troubleshooting",
    subtitle: "Common issues and solutions",
    content: [
      {
        type: "text",
        content: "This section covers common issues you might encounter while using Tvara and provides step-by-step solutions to resolve them quickly."
      },
      {
        type: "text",
        content: "**Connection Issues:** If you're experiencing connection problems, first check your network configuration and firewall settings. Ensure that the required ports are open and accessible."
      },
      {
        type: "code",
        language: "bash",
        content: "# Check if Tvara is running\nps aux | grep tvara\n\n# Check port availability\nnetstat -tulpn | grep :3000\n\n# View application logs\ntail -f /var/log/tvara/app.log"
      },
      {
        type: "list",
        items: [
          "Network connectivity diagnostics",
          "Database connection troubleshooting",
          "Performance optimization tips",
          "Error log interpretation",
          "Memory and CPU monitoring"
        ]
      }
    ]
  }
};