# PowerShell script to remove HTTP reservations on port 80
# MUST RUN AS ADMINISTRATOR

Write-Host "Checking current HTTP reservations on port 80..." -ForegroundColor Yellow
netsh http show urlacl | Select-String ":80"

Write-Host "`nTo remove a reservation, use:" -ForegroundColor Cyan
Write-Host "netsh http delete urlacl url=http://+:80/PATH_HERE" -ForegroundColor Green

Write-Host "`nExample commands (run as Administrator):" -ForegroundColor Yellow
Write-Host "netsh http delete urlacl url=http://+:80/Temporary_Listen_Addresses/" -ForegroundColor Green
Write-Host "netsh http delete urlacl url=http://+:80/0131501b-d67f-491b-9a40-c4bf27bcb4d4/" -ForegroundColor Green
Write-Host "netsh http delete urlacl url=http://+:80/116B50EB-ECE2-41ac-8429-9F9E963361B7/" -ForegroundColor Green

Write-Host "`nWARNING: Only remove these if you're sure they're not needed!" -ForegroundColor Red
Write-Host "These might be used by other applications." -ForegroundColor Red

