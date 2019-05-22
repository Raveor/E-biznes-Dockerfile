package models

import play.api.libs.json.Json

case class Client(id: Int, username: String, email: String, password: String)

object Client {
  implicit val clientFormat = Json.format[Client]
}
