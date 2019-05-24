package models

import play.api.libs.json.Json

case class Admin(id: Int, username: String, email: String, password: String)

object Admin {
  implicit val adminFormat = Json.format[Admin]
}