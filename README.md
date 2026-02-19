# ShareSafely 🔐

*Secure file sharing with Azure cloud infrastructure*

## 🔐 Project Overview

**ShareSafely** is a secure, cloud-based file-sharing web application that enables users to upload files and generate time-limited sharing links. Built on Azure's robust cloud infrastructure, this application demonstrates modern cloud engineering practices while providing a safe and efficient way to share files with automatic expiration capabilities.

This project serves as a comprehensive implementation of Azure storage solutions, showcasing secure file handling, credential management, and automated cleanup processes.

## 🌐 Live Demo

- **Frontend**: [https://share-safely.vercel.app/](https://sharesafely.azurewebsites.net)
- **Backend API**: Deployed on **Azure Functions**

## 📦 Key Features

- 📤 **Secure File Upload**: Upload files directly through a web interface to Azure Blob Storage
- 🔒 **Enterprise-Grade Security**: Data at rest encryption with Azure Blob Storage
- ⏰ **Time-Limited Access**: Generate unique, expiring links using Azure Storage SDK
- 🔑 **Credential Management**: Secure storage of sensitive data using Azure Key Vault
- 📊 **Activity Monitoring**: Track file upload and download activities
- 🗑️ **Automated Cleanup**: Automatic removal of expired files using Azure Blob Storage Lifecycle Management
- 🛡️ **Zero Permanent Access**: No persistent public access to uploaded files

## 🏗️ Architecture Overview

```
┌─────────────────┐  1.GetUploadUrl  ┌──────────────────┐
│  Web Frontend   │─────────────────▶│  Azure Functions │
│ (React + Vite)  │◀─────────────────│    (Node.js)     │
│                 │  (write SAS URL) │                  │
│                 │                  └──────────────────┘
│                 │  2. PUT file directly
│                 │─────────────────▶┌──────────────────┐
│                 │                  │  Azure Blob      │
│                 │                  │   Storage        │
│                 │                  └──────────────────┘
│                 │  3.GenerateLink
│                 │─────────────────▶┌──────────────────┐
│                 │◀─────────────────│  Azure Functions │
└─────────────────┘  (read SAS URL)  └──────────────────┘
```

## 🛠️ Technologies & Azure Services

### ☁️ Core Azure Services
- **Azure Blob Storage** - Secure file storage with data at rest encryption and lifecycle management
- **Azure Functions** - Serverless backend hosting and execution
- **Azure Key Vault** - Secure credential and configuration management


### 🧰 Development Stack
- **Node.js (Azure Functions)** - Serverless backend logic
- **Azure Storage SDK** - Blob operations and SAS token generation
- **Azure Key Vault SDK** - Secure credential retrieval
- **React** - Frontend user interface

### 🔄 DevOps & Deployment
- **GitHub Actions** - CI/CD pipeline linked with Azure App Services
- **Vercel** - Frontend with CI/CD setup

## 🔐 Security Features

- 🔒 **Data at Rest Encryption** - All files encrypted in Azure Blob Storage
- 🔑 **Azure Key Vault Integration** - No hardcoded credentials in application
- ⏰ **SAS Token Authentication** - Time-limited, secure access URLs
- 🛡️ **HTTPS Enforcement** - All communications encrypted in transit
- 📋 **Access Monitoring** - Comprehensive logging of all file operations
- 🗑️ **Automatic Expiration** - Files and links expire automatically

## 📁 Project Structure

```
sharesafely/
├── Backend/
│   ├── GetUploadUrl/
│   │   ├── function.json
│   │   └── index.js
│   ├── GenerateLink/
│   │   ├── function.json
│   │   └── index.js
│   ├── services/
│   │   └── blob.js
│   ├── host.json
│   └── local.settings.json
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CopyLink.jsx
│   │   │   └── Upload.jsx
│   │   ├── main.jsx
│   │   └── App.jsx
│   └── index.html
└── README.md
```

## 🔧 Configuration

### Required App Settings

| Setting | Description | Example |
|---------|-------------|---------|
| `KeyVaultName` | Name of your Azure Key Vault | `ShareSafely-KeyVault` |
| `BlobContainerName` | Blob storage container name | `uploads` |
| `DefaultLinkExpiryHours` | Default expiry time for links | `24` |
| `MaxFileSizeMB` | Maximum file size allowed | `100` |

### Key Vault Secrets

| Secret Name | Description |
|-------------|-------------|
| `StorageConnectionString` | Azure Storage account connection string |
| `ApplicationInsightsKey` | Application Insights instrumentation key |

## 📊 Monitoring and Lifecycle Management

### Automated Cleanup with Lifecycle Management

The project uses Azure Blob Storage Lifecycle Management to automatically:
- Delete expired files based on configured rules
- Transition files to cooler storage tiers if needed
- Reduce storage costs through automated management


### Monitoring Dashboard

Track key metrics through Azure Monitor:
- File upload/download counts
- Storage usage trends
- Link generation patterns
- Error rates and performance metrics

## 🧠 Learning Outcomes

This project demonstrates proficiency in:

- **Azure Blob Storage** - Secure file storage and lifecycle management
- **Azure Key Vault** - Enterprise credential management
- **Azure Functions** - Serverless application hosting
- **Lifecycle Management Policies** - Automated storage optimization
- **SAS Token Management** - Secure, time-limited access patterns
- **Security Best Practices** - Zero-trust security model
- **Monitoring & Observability** - Application performance tracking

## 📌 Roadmap

- [ ] 🔐 **Multi-Factor Authentication** - Enhanced user security
- [ ] 📱 **Mobile Application** - Cross-platform mobile support
- [ ] 🔄 **File Versioning** - Multiple versions of uploaded files
- [ ] 📊 **Advanced Analytics** - Detailed usage reporting
- [ ] 🌍 **Global Distribution** - CDN integration for worldwide access
- [ ] 🤖 **Virus Scanning** - Automated malware detection
- [ ] 📧 **Email Notifications** - Upload/download notifications

## 🚨 Important Security Considerations

- Always use HTTPS for all communications
- Regularly rotate Key Vault secrets
- Monitor access patterns for suspicious activity
- Implement proper CORS policies
- Use Azure AD for authentication in production
- Enable Azure Security Center recommendations


## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Rahul Deshmukh**
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/rahuldeshmukh-2k02/)

🤖 **Assistance & Authoring Support:**

ChatGPT-4o

---

## 🧠 Project Inspiration

This project was inspired by the excellent open-source work at:

🔗 [cloud-engineering-projects by @madebygps](https://github.com/madebygps/cloud-engineering-projects)

Credit for the original project idea structure and learning goals goes to them.

---

*Built with ❤️ using Azure Cloud Services*

## 📚 Additional Resources

- [Azure Blob Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/)
- [Azure Key Vault Best Practices](https://docs.microsoft.com/en-us/azure/key-vault/general/best-practices)
- [Azure Web Apps Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure Functions Documentation](https://docs.microsoft.com/en-us/azure/azure-functions/)