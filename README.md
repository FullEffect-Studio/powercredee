# Brainbirds Academy - School Transport System

## Description
A platform for managing students transport to and fro using school bus. 
The goal is to provide reliability and confidentiality about the whereabouts of students to both school authorities and parents.
We want to make sure that students picked up to school in the morning and also safely brought back to their homes at the end of the day.


### Instrospecting database with prisma
```npx prisma db pull```

```npx prisma generate```

```npx prisma migrate dev --name init```

* Push schema changes to database
  ```npx prisma db push```

* Seeding 
  ```npx prisma db seed```


###  Settings
* school location  will limit the pickup points to a geofences radius

### Google Maps usage
https://timdeschryver.dev/blog/google-maps-as-an-angular-component#mapinfowindow
