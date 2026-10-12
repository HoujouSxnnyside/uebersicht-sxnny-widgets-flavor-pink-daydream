# Shell Scripts

Directory for lightweight Bash/Zsh scripts or prototypes before migrating to native Swift CLI tools.

## Übersicht Integration Rule
For seamless integration with React + TypeScript widgets, shell scripts must always output valid single-line JSON to `stdout`:

```bash
#!/usr/bin/env bash
# Example: wifi-info.sh
SSID=$(networksetup -getairportnetwork en0 | awk -F': ' '{print $2}')
printf '{"ssid":"%s","connected":%s}\n' "${SSID:-None}" "$([ -n "$SSID" ] && echo true || echo false)"
```
