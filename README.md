api = "http://localhost:8080/api/notify"
Port number use either 8080(env)  or 3000

test on postmen
in json add this 
{
  "to": "riyazulahad786@gmail.com",
  "subject": "Email Test Notification from Riyaz",
  "text": "This is a test notification from Riyaz.",
  "urgency": "high",
  "activity": "active"
}
