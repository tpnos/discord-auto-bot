# Codex & Agent Automation Rules

## Core Goal
The primary goal is for Codex to autonomously modify the code and **push directly to the GitHub `main` branch**. Railway will then automatically redeploy the bot.

## Automation Pipeline
1. **Request**: User asks for a feature or fix.
2. **Implementation**: Codex modifies the code in the workspace.
3. **Verification**: Codex runs basic checks (e.g., `npm run start` or syntax check).
4. **Push**: Codex MUST push the changes to GitHub `main` using `git` or `gh` CLI.
5. **Deployment**: Railway automatically detects the push and redeploys.

## Git/GitHub Rules
- **Direct Push**: Codex has permission to push directly to `main`.
- **Commit Message**: Use clear, descriptive commit messages (e.g., "feat: add /test command", "fix: resolve startup error").
- **Authentication**: Codex should use the pre-configured `gh` CLI or git credentials.

## Technical Stack
- **Language**: Node.js
- **Library**: discord.js (v14+)
- **Hosting**: Railway
- **CI/CD**: GitHub Auto-deployment to Railway

## Project Structure
- `src/index.js`: Main entry point and command registration.
- `src/commands/`: Individual command files.
- `src/deploy-commands.js`: Script for manual command registration if needed.

## Autonomous Self-Correction
- If a deployment fails or the bot crashes, Codex should check Railway logs and fix the issue immediately.
- Always ensure that new commands are added to:
  1. `src/commands/<name>.js`
  2. `src/index.js` (loaded in `commands` array)
  3. `src/deploy-commands.js` (for manual registration)

---
*Last updated by Manus on May 28, 2026*
