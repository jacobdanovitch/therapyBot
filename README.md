# talkaBOTit

## The Story
In the US, many health insurance providers don't cover mental health treatment such as appointments with therapists for talk therapy. In Canada, coverage is available, but patients often have to wait inordinate amounts of time to be seen. This is counterintuitive to the goal of therapy, which aims to help patients as soon as possible and on their own terms. We aim to make mental health treatment more accessible to all, regardless of their means.

## The Hack
We utilized the Microsoft Azure Emotion API to analyze the emotions of the patient in order to better respond and interact with them. Additionally, Watson's Natural Language Understanding API was used to process the actual language of the patient and respond accordingly. By scraping conversation data from over 2000 full therapy sessions, we were able to analyze the speech patterns of the therapist in order to better emulate the full experience of talk therapy.

## Challenges
Both Microsoft Azure and Watson's APIs were difficult to setup and interface with over a short period of time such as a hackathon. Both are incredibly powerful tools, but are challenging to train using their full machine-learning capabilities with such a small amount of time. Additionally, Azure's required file formats were not the file formats we had available, so we had to attempt to find open-source media conversion tools, which we unfortunately were not able to find, so we had to change course.

## Practicality
The app is web-based, so users can use it anywhere and anytime, be it on desktop or on mobile. Studies have shown that therapy is even more successful in helping patients to open up about their experiences when the patient knows that they are speaking with a bot rather than a real person, so a bot may actually improve the patient experience and benefits on some level.