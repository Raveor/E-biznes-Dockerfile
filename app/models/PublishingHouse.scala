package models

import play.api.libs.json.Json

case class PublishingHouse(id: Int, name: String)

object PublishingHouse {
  implicit val publishingHouseFormat = Json.format[PublishingHouse]
}
