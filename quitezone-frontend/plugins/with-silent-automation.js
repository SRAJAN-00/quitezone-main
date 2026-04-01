const { AndroidConfig, withAndroidManifest } = require("expo/config-plugins");

function withSilentAutomation(config) {
  return withAndroidManifest(config, (configWithManifest) => {
    const manifest = configWithManifest.modResults;
    AndroidConfig.Permissions.addPermission(manifest, "android.permission.ACCESS_NOTIFICATION_POLICY");
    return configWithManifest;
  });
}

module.exports = withSilentAutomation;
