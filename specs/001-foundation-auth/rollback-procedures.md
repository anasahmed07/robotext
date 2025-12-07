# Rollback Procedures

This document outlines procedures for rolling back deployments in case of production issues.

## Table of Contents
1. [Backend Rollback (Railway)](#backend-rollback-railway)
2. [Frontend Rollback (GitHub Pages)](#frontend-rollback-github-pages)
3. [Database Rollback (Neon)](#database-rollback-neon)
4. [Emergency Procedures](#emergency-procedures)

---

## Backend Rollback (Railway)

### Scenario 1: Bad Deployment
If the latest deployment causes issues:

1. **Via Railway Dashboard**:
   - Navigate to your project in Railway
   - Click on "Deployments" tab
   - Find the last known working deployment
   - Click "..." menu → "Redeploy"

2. **Via Git**:
   ```bash
   # Identify the working commit
   git log --oneline

   # Revert to that commit
   git revert <bad-commit-hash>
   git push origin main
   
   # Railway will auto-deploy the reverted version
   ```

3. **Verify**:
   ```bash
   curl https://your-app.railway.app/health
   ```

### Scenario 2: Environment Variable Issues
If environment variables were changed incorrectly:

1. Go to Railway Dashboard → Settings → Variables
2. Click "History" to see previous values
3. Restore the correct values
4. Redeploy the service

### Scenario 3: Database Connection Lost
If DATABASE_URL is broken:

1. Get correct connection string from Neon dashboard
2. Update DATABASE_URL in Railway environment variables
3. Restart the service (or redeploy)

---

## Frontend Rollback (GitHub Pages)

### Scenario 1: Bad Build Deployed
If the latest build has issues:

1. **Find the working commit**:
   ```bash
   git log --oneline
   ```

2. **Revert the bad commit**:
   ```bash
   git revert <bad-commit-hash>
   git push origin main
   ```

3. **Wait for GitHub Actions** to rebuild and redeploy (5-10 minutes)

4. **Verify**:
   - Visit `https://anasahmed07.github.io/robotext/`
   - Test login, signup, language switching

### Scenario 2: Manual Rollback
If you need to manually rollback to a specific version:

1. **Create a rollback branch**:
   ```bash
   git checkout <working-commit-hash>
   git checkout -b rollback-<date>
   git push origin rollback-<date>
   ```

2. **Update GitHub Pages deployment** to use rollback branch temporarily

3. **Fix the issue** on main branch

4. **Switch back** to main branch deployment when fixed

---

## Database Rollback (Neon)

### Scenario 1: Schema Migration Issues
If a migration breaks the database:

1. **Connect to Neon database**:
   ```bash
   psql $DATABASE_URL
   ```

2. **Check migration history**:
   ```sql
   SELECT * FROM drizzle_migrations ORDER BY created_at DESC;
   ```

3. **Manually revert migration** (if safe):
   - For column additions: `ALTER TABLE table_name DROP COLUMN column_name;`
   - For table creations: `DROP TABLE table_name;`
   - For data changes: Restore from backup

4. **Or use Neon's Point-in-Time Recovery**:
   - Go to Neon Dashboard → Branches
   - Create a new branch from a point in time before the migration
   - Update DATABASE_URL to point to the new branch
   - Test thoroughly before switching production

### Scenario 2: Data Corruption
If data was corrupted by a bad query:

1. **Use Neon's Time Travel** (if within retention period):
   ```sql
   -- Query data as it was at a specific timestamp
   SELECT * FROM users AS OF SYSTEM TIME '2025-12-06 10:00:00';
   ```

2. **Restore from backup**:
   - Neon automatically backs up data
   - Create a new branch from the backup timestamp
   - Migrate production to the new branch

---

## Emergency Procedures

### 🚨 Complete System Failure

If both frontend and backend are down:

1. **Immediate Actions**:
   - Post status update on GitHub (create an issue)
   - Set up a maintenance page if possible

2. **Triage**:
   - Check Railway status page: https://railway.app/status
   - Check GitHub Pages status: https://www.githubstatus.com/
   - Check Neon status: https://neon.tech/status

3. **Recovery Priority**:
   - First: Restore backend (critical for authentication)
   - Second: Restore database connection
   - Third: Restore frontend

### 🔥 Security Breach

If AUTH_SECRET is compromised:

1. **Immediately**:
   ```bash
   # Generate new secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Update in Railway**:
   - Set new AUTH_SECRET environment variable
   - Redeploy backend

3. **Side Effects**:
   - All existing sessions will be invalidated
   - Users will need to log in again

4. **Communication**:
   - Notify users about required re-login
   - Explain security measure was necessary

### 🔌 CORS Issues After Deployment

If frontend can't connect to backend:

1. **Verify FRONTEND_URL** in Railway:
   ```
   Should be: https://anasahmed07.github.io
   NOT: https://anasahmed07.github.io/robotext/
   ```

2. **Check allowed origins** in `api/src/middleware/cors.ts`

3. **Redeploy backend** if CORS config was changed

---

## Testing After Rollback

Always perform these checks after any rollback:

- [ ] Health endpoint responds: `curl <backend-url>/health`
- [ ] Login works with test account
- [ ] Signup creates new users
- [ ] Onboarding saves profiles
- [ ] Language switching works (English ↔ Urdu)
- [ ] Theme switching works (Light ↔ Dark)
- [ ] Session persists across page refresh
- [ ] Logout terminates session

---

## Contact & Escalation

If standard procedures don't work:

1. **Check service provider status pages** (Railway, GitHub, Neon)
2. **Review recent commits** for breaking changes
3. **Check logs**:
   - Railway: Dashboard → Deployments → Logs
   - GitHub Actions: Actions tab → Latest workflow
4. **Create issue** in GitHub repository with:
   - Error messages
   - Steps to reproduce
   - Expected vs actual behavior
   - Rollback attempts made

---

## Prevention

To minimize need for rollbacks:

- ✅ Test changes locally before pushing
- ✅ Use staging environment for major changes
- ✅ Review PR changes carefully
- ✅ Monitor logs after deployment
- ✅ Keep this document updated with new scenarios
