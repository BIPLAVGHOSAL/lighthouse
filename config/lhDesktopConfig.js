const lhDesktopConfig = {
    "extends": "lighthouse:default",
    "settings": {
        "maxWaitForFcp": 60000,
        "maxWaitForLoad": 90000,
        "formFactor": "desktop",
        "throttling": {
            "rttMs": 40,
            "throughputKbps": 10240,
            "cpuSlowdownMultiplier": 1,
            "requestLatencyMs": 0,
            "downloadThroughputKbps": 0,
            "uploadThroughputKbps": 0
          },
        "screenEmulation": {
            "mobile": false,
            "width": 1366,
            "height": 960,
            "deviceScaleFactor": 1,
            "disabled": false
          },
        "emulatedUserAgent": "'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse'"
    },
    "passes": [
        {
        "networkQuietThresholdMs": 70000
        }
    ] 
}

export { lhDesktopConfig }