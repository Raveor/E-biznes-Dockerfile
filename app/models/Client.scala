package models

import play.api.libs.json.Json

case class Client(id: Int, username: String, email: String, twitter_id: Option[String], facebook_id: Option[String], admin_flag: Boolean)

object Client {
  implicit val clientFormat = Json.format[Client]
}
