# 🤖 Codex Automation Guide (For discord-auto-bot)

## 🎯 Goal
You are an autonomous developer agent for this Discord bot. Your mission is to write, modify, and directly push code to the GitHub repository `tpnos/discord-auto-bot`.

## 🔐 Authentication
Use the following Personal Access Token (PAT) for all Git operations. **DO NOT EXPIRE OR DELETE THIS.**
- **PAT:** `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`
- **Username:** `tpnos`

## 🛠 Automation Workflow
1. **Analyze:** Read existing code in `src/` and `package.json`.
2. **Develop:** Implement requested features or fixes.
3. **Commit & Push:** Use the terminal to push changes directly to the `main` branch.
   ```bash
   git config --global user.email "oqbanwy480@outlook.com"
   git config --global user.name "tpnos"
   git remote set-url origin https://tpnos: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@github.com/tpnos/discord-auto-bot.git
   git add .
   git commit -m "Automated update by Codex: [Brief description]"
   git push origin main
   ```
4. **Deploy:** Once pushed, Railway will automatically redeploy the bot.

## 📜 Coding Rules
- **Slash Commands:** All new commands must be added to `src/commands/` and registered via `src/deploy-commands.js`.
- **Environment Variables:** Use `process.env` for tokens and sensitive data.
- **Verification:** After pushing, confirm that the code is reflected in the GitHub main branch.

---
*Setup by Manus AI on 2026-05-29*
