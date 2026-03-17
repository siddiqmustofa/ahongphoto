# Email Setup dengan Resend

## Setup Resend API Key

GlowBox menggunakan Resend untuk mengirim foto via email dengan template HTML yang cantik.

### Langkah Setup:

1. **Daftar di Resend**
   - Kunjungi: https://resend.com
   - Buat akun gratis (100 emails/day)

2. **Dapatkan API Key**
   - Login ke Dashboard Resend
   - Pergi ke: API Keys → Create API Key
   - Copy API key (dimulai dengan `re_...`)

3. **Update Environment Variable**
   Edit file `/app/backend/.env`:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   SENDER_EMAIL=noreply@yourdomain.com
   ```
   
   **Catatan**: Dalam testing mode, email hanya terkirim ke email yang sudah diverifikasi di Resend.

4. **Restart Backend**
   ```bash
   sudo supervisorctl restart backend
   ```

5. **Test Email**
   Ambil foto di GlowBox dan coba kirim via email!

## Template Email

Email yang dikirim menggunakan HTML template dengan:
- Logo GlowBox dengan efek 3D
- Foto strip yang diambil (embedded as base64)
- Nama frame yang digunakan
- Design yang match dengan tema candy/bubble pop
- Gradient background pink
- Responsive design

## Troubleshooting

### Email tidak terkirim?
1. Cek API key di `.env` sudah benar
2. Pastikan SENDER_EMAIL valid
3. Dalam testing mode, email hanya ke verified addresses
4. Cek backend logs: `tail -f /var/log/supervisor/backend.*.log`

### Untuk Production:
1. Verify domain Anda di Resend untuk deliverability lebih baik
2. Upgrade plan jika butuh > 100 emails/day
3. Setup SPF, DKIM, dan DMARC records untuk domain Anda
