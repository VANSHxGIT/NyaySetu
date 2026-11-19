#!/bin/bash
# ═══════════════════════════════════════════════════════════
# NyaySetu — Database Backup Script
# Schedule via cron: 0 2 * * * /path/to/backup.sh
# Retention: 7 daily + 4 weekly
# ═══════════════════════════════════════════════════════════

set -euo pipefail

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="${BACKUP_DIR:-./backups}"
DATABASE_URL="${DATABASE_URL:?ERROR: DATABASE_URL not set}"

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting backup..."
pg_dump "$DATABASE_URL" | gzip > "$BACKUP_DIR/nyaysetu_$TIMESTAMP.sql.gz"

# Keep only last 7 daily backups
ls -t "$BACKUP_DIR"/nyaysetu_*.sql.gz 2>/dev/null | tail -n +8 | xargs rm -f 2>/dev/null || true

BACKUP_SIZE=$(du -h "$BACKUP_DIR/nyaysetu_$TIMESTAMP.sql.gz" | cut -f1)
echo "[$(date)] Backup completed: nyaysetu_$TIMESTAMP.sql.gz ($BACKUP_SIZE)"
