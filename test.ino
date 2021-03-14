int knpGreen;
int intervalGreen;
int knpRed;
int intervalRed;
int wacht=2500;
int redLed=13;
int greenLed = 9;
int i;
string invoer;

void setup()
{
pinMode(greenLed,OUTPUT);
pinMode(redLed,OUTPUT);
Serial.begin(9600);
}

//! green led procedure
int  greenLedProcedure(){
 Serial.println("hoe vaak moet de groen led knipperen?");
  knpGreen=0;
  while(knpGreen<=0 || knpGreen>10)
  {
    while(Serial.available()==0){};
    knpGreen = Serial.parseInt();
    if(knpGreen<1 || knpGreen>10){
    Serial.println("onjuiste invoer. voer een getal tussen 1 en. 10?");
    }
  }
}
//!green led interval function
int greenLedInterval(){
Serial.println("met welke interval moet led green knipperen in seconden?");
  intervalGreen=0;
  while(intervalGreen<=0 || intervalGreen>10)
  {
    while(Serial.available()==0){};
    intervalGreen = Serial.parseInt();
    if(intervalGreen<1 || intervalGreen>10){
    Serial.println("onjuiste invoer. voer een getal tussen 1 en. 10?");
    }
  }
}
//! red led procedure
int redLedProcedure(){
Serial.println("hoe vaak moet de red led knipperen?");
  knpRed=0;
  while(knpRed<=0 || knpRed>10)
  {
    while(Serial.available()==0){};
    knpRed = Serial.parseInt();
    if(knpRed<1 || knpRed>10){
    Serial.println("onjuiste invoer. voer een getal tussen 1 en. 10?");
    }
  }
}
//!red led interval
int redLedInterval(){
Serial.println("met welke interval moet led Red knipperen in seconden?");
  intervalRed=0;
  while(intervalRed<=0 || intervalRed>10)
  {
    while(Serial.available()==0){};
    intervalRed = Serial.parseInt();
    if(intervalRed<1 || intervalRed>10){
    Serial.println("onjuiste invoer. voer een getal tussen 1 en. 10?");
    }
  }
}

void loop()
{

    //green led procedure fun
 greenLedProcedure();
  //green led procedure interval fun
  greenLedInterval();
  //RED led procedure fun
  redLedProcedure();
  //knpRed led procedure interval fun
 redLedInterval();


  //TODO: starting blinking green
  for(i=0;i<knpGreen;i++){
      digitalWrite(greenLed,HIGH);
      delay(intervalGreen*1000);
      digitalWrite(greenLed,LOW);
     delay(intervalGreen*1000);
  }

  //TODO: starting blinking red
  for(i=0;i<knpRed;i++){
      digitalWrite(redLed,HIGH);
      delay(intervalRed*1000);
      digitalWrite(redLed,LOW);
     delay(intervalRed*1000);
  }
}