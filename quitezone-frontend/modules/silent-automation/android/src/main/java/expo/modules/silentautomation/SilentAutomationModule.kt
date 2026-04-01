package expo.modules.silentautomation

import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.os.Build
import android.provider.Settings
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class SilentAutomationModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("SilentAutomation")

    AsyncFunction("getSilentAutomationStatus") {
      val context = appContext.reactContext ?: return@AsyncFunction mapOf(
        "canControlRinger" to false,
        "reason" to "React context unavailable"
      )
      val canControl = canControlRinger(context)
      mapOf(
        "canControlRinger" to canControl,
        "reason" to if (canControl) null else "Notification policy access not granted"
      )
    }

    AsyncFunction("requestSilentAutomationAccess") {
      val context = appContext.reactContext ?: return@AsyncFunction mapOf(
        "granted" to false,
        "reason" to "React context unavailable"
      )

      if (canControlRinger(context)) {
        return@AsyncFunction mapOf("granted" to true)
      }

      val intent = Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS).apply {
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }
      context.startActivity(intent)

      mapOf(
        "granted" to false,
        "reason" to "Notification policy access screen opened"
      )
    }

    AsyncFunction("setRingerMode") { mode: String ->
      val context = appContext.reactContext ?: return@AsyncFunction mapOf(
        "applied" to false,
        "blocked" to true,
        "reason" to "React context unavailable"
      )

      if (!canControlRinger(context)) {
        return@AsyncFunction mapOf(
          "applied" to false,
          "blocked" to true,
          "reason" to "Notification policy access not granted"
        )
      }

      val audioManager = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
      val nextMode = when (mode.lowercase()) {
        "silent" -> AudioManager.RINGER_MODE_SILENT
        "vibrate" -> AudioManager.RINGER_MODE_VIBRATE
        "normal" -> AudioManager.RINGER_MODE_NORMAL
        else -> {
          return@AsyncFunction mapOf(
            "applied" to false,
            "blocked" to true,
            "reason" to "Unsupported mode: $mode"
          )
        }
      }

      audioManager.ringerMode = nextMode
      mapOf(
        "applied" to true,
        "blocked" to false,
        "reason" to null
      )
    }
  }

  private fun canControlRinger(context: Context): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.N) {
      return true
    }
    val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    return notificationManager.isNotificationPolicyAccessGranted
  }
}
