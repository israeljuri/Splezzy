export default function User(name, gender, score, lettersPerWord) {
  this.id = new Date().getTime();
  this.name = name;
  this.gender = gender;
  this.url = "";
  if (gender === "boy") this.url = "images/heads/boy.jpg";
  if (gender === "girl") this.url = "images/heads/girl.jpg";
  this.score = score;
  this.lettersPerWord = lettersPerWord;
}
