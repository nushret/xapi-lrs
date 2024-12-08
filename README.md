# xAPI LRS Implementation Guide

Complete installation and setup guide for xAPI LRS on Ubuntu Server.

## System Requirements
- Ubuntu Server 20.04 LTS or newer
- Root access or sudo privileges

## Step-by-Step Installation

### 1. Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Node.js and NPM
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

### 3. Install MongoDB
```bash
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### 4. Install PM2 Process Manager
```bash
sudo npm install -g pm2
```

### 5. Create Project Directory
```bash
sudo mkdir -p /opt/xapi-lrs
sudo chown -R $USER:$USER /opt/xapi-lrs
cd /opt/xapi-lrs
```

### 6. Create Project Files
```bash
nano app.js
```
Copy the complete app.js content from the repository.

### Create public/index.html:
```bash
mkdir public
nano public/index.html
```
Copy the complete index.html content.

### 4. Install PM2 Process Manager
```bash
```

### 4. Install PM2 Process Manager
```bash
```

### 4. Install PM2 Process Manager
```bash
```
