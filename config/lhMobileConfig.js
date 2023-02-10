const lhMobileConfig = {
    "extends": "lighthouse:default",
    "settings": {
        "maxWaitForFcp": 30000,
        "maxWaitForLoad": 45000
    },
    "passes": [
        {
        "networkQuietThresholdMs": 35000
        }
    ] 
}

export { lhMobileConfig }