package models

import play.api.libs.json.Json

case class User(id: Int, username: String, email: String, twitter_id: Int, google_id: Int, admin_flag: Boolean)

object User {
  implicit val clientFormat = Json.format[User]
}
