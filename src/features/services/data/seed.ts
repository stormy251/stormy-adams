import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"
import { tags, priorities, statuses } from "../constants/services-data-table-constants"

const services = Array.from({ length: 100 }, () => ({
  id: `SV-${faker.number.int({ min: 1, max: 400 })}`,
  title: faker.hacker.noun(),
  owner: `${faker.person.firstName()} ${faker.person.lastName()}`,
  description: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  status: faker.helpers.arrayElement(statuses).value,
  tag: faker.helpers.arrayElement(tags).value,
  priority: faker.helpers.arrayElement(priorities).value,
}))

fs.writeFileSync(
  path.join(__dirname, "services.json"),
  JSON.stringify(services, null, 2)
)