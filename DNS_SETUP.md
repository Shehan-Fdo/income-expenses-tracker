# DNS Setup Instructions

## Add DNS Record in Cloudflare

To enable `tracker.kavindushehan.site`, add this DNS record in Cloudflare:

### DNS Record Details

| Field | Value |
|--------|-------|
| **Type** | A |
| **Name** | `tracker` |
| **Content** | `143.198.220.222` |
| **Proxy Status** | Proxied (Orange cloud) ☁️ |
| **TTL** | Auto |

### Steps

1. Log in to Cloudflare
2. Select domain: `kavindushehan.site`
3. Go to **DNS** > **Records**
4. Click **Add Record**
5. Fill in the fields above
6. Click **Save**

### What This Does

- **Proxied (Orange cloud):** Cloudflare will provide SSL/HTTPS automatically
- **Your app:** Will be accessible at `https://tracker.kavindushehan.site`
- **Benefits:** Free SSL, DDoS protection, CDN

### After Adding

DNS propagation takes 5-30 minutes. Once done:

1. **Immediate access:** `https://tracker.kavindushehan.site`
2. **HTTP version:** `http://tracker.kavindushehan.site` (redirects to HTTPS via Cloudflare)

### Alternative: Let's Encrypt SSL

If you prefer Let's Encrypt SSL instead of Cloudflare:

1. Set DNS to **DNS Only (Grey cloud)** in Cloudflare
2. Run: `sudo bash scripts/ssl-setup.sh`
3. This generates Let's Encrypt SSL certificate

### Current Setup

- ✅ Docker container running (income-tracker)
- ✅ Nginx reverse proxy configured
- ✅ SSL ready (Cloudflare or Let's Encrypt)
- ⏳ DNS record pending

### Troubleshooting

**Domain not accessible after 30 minutes:**
- Check DNS record is correct in Cloudflare
- Wait for full DNS propagation (can take up to 48 hours)
- Clear DNS cache: `sudo systemd-resolve --flush-caches`

**SSL certificate errors:**
- Enable Cloudflare proxy (Orange cloud) for automatic SSL
- Or run `scripts/ssl-setup.sh` for Let's Encrypt certificate
