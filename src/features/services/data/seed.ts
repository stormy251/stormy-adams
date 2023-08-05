import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { labels, priorities, statuses } from "@/features/services/constants/services-data-table-constants";

const services = Array.from({ length: 100 }, () => ({
  id: `SERVICE-${faker.datatype.number({ min: 1000, max: 9999 })}`,
  title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  status: faker.helpers.arrayElement(statuses).value,
  label: faker.helpers.arrayElement(labels).value,
  priority: faker.helpers.arrayElement(priorities).value,
}))

fs.writeFileSync(
  path.join(__dirname, "services.json"),
  JSON.stringify(services, null, 2)
)