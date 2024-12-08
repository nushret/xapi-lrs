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
Copy the complete index.html content from the repository.

### 7. Initialize Project and Install Dependencies
```bash
npm init -y
npm install express mongoose body-parser cors basic-auth dotenv
```

### 8. Configure Environment Variables
```bash
nano .env
```
Add these lines:
```bash
LRS_USERNAME=admin
LRS_PASSWORD=secure_password
```

### 9. Start Application
```bash
pm2 start app.js --name xapi-lrs
pm2 startup
pm2 save
```
### 10. Verify Installation
Check MongoDB status:
```bash
sudo systemctl status mongodb
```
Check application logs:
```bash
pm2 logs xapi-lrs
```
Test the application:
```bash
curl http://localhost:3000
```


## 🚀 Usage

### Access Points
- **Dashboard**: [http://your-server:3000](http://your-server:3000)
- **Report Page**: [http://your-server:3000/report.html](http://your-server:3000/report.html)
- **API Endpoint**: [http://your-server:3000/TCAPI/](http://your-server:3000/TCAPI/)

---

## 🎯 Storyline Configuration

In **Articulate Storyline**, configure the following:

- **LRS URL**: `http://your-server:3000/TCAPI/`
- **Username**: `admin` (or as set in `.env`)
- **Password**: `secure_password` (or as set in `.env`)

---

## 🛠️ Monitoring

Use `pm2` for process management:

1. **Check status**:
   ```bash
   pm2 status
   ```

2. **View logs**:
   ```bash
   pm2 logs xapi-lrs
   ```

3. **Monitor processes**:
   ```bash
   pm2 monit
   ```

---

## 📊 Database Management

Manage your MongoDB database with the following commands:

1. Access the Mongo shell:
   ```bash
   mongosh
   use xapi-lrs
   ```

2. **View statements**:
   ```javascript
   db.statements.find()
   ```

3. **Clear all statements**:
   ```javascript
   db.statements.deleteMany({})
   ```

---

## 🔒 Security Recommendations

1. **Change default credentials** in the `.env` file.
2. **Configure a firewall**:
   ```bash
   sudo ufw allow 3000
   sudo ufw enable
   ```

---

## 🔧 Troubleshooting

1. **Check MongoDB connection**:
   ```bash
   sudo systemctl status mongodb
   ```

2. **View application logs**:
   ```bash
   pm2 logs xapi-lrs
   ```

3. **Restart services**:
   ```bash
   sudo systemctl restart mongodb
   pm2 restart xapi-lrs
   ```

---

## 📂 Project Structure

The directory structure of the project is as follows:

```
/opt/xapi-lrs/
├── app.js
├── package.json
├── .env
└── public/
    ├── index.html
    └── report.html
```

---

## 🧰 Maintenance

1. **System updates**:
   ```bash
   sudo apt update
   sudo apt upgrade
   npm update
   pm2 update
   ```

2. **Backup database**:
   ```bash
   mongodump --db xapi-lrs
   ```
---

## 📌 Notes

- Ensure that all sensitive data in `.env` is secured.
- Regularly monitor logs and process statuses for optimal operation.

---

### 💡 Contribute
Feel free to contribute by submitting issues or pull requests.

---
