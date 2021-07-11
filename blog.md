## A deep dive into What the Wine

---

## UX

**How It Started**

In the project phase of our course at Techlabs, we had to select a project idea to develop or be a part of. What The Wine project resonated with every member of the team and we came together to work on this exciting project.

**The Problem**

We started the project by brainstorming on pain points for most people when buying wines and decided that the next step was to gather insights from people that consume wine regularly. This led to a survey we conducted as part of the user research phase.

![image1](https://user-images.githubusercontent.com/60686512/125177303-ff765f80-e1da-11eb-8b82-43abb2263dd9.png)

Findings from the survey revealed that most people get overwhelmed by the wide selection of wines at supermarkets and do not know how to choose the right wine for the occasion. A major problem when buying wine was knowing what the wine tasted like before buying (sweet, dry, bitter, bittersweet, etc.) After taking notes of these problems, we created a user persona and scenario to help us understand our users' needs.

![image2](https://user-images.githubusercontent.com/60686512/125177311-08ffc780-e1db-11eb-88e9-a844e5e7ea02.png)

![image3](https://user-images.githubusercontent.com/60686512/125177312-0a30f480-e1db-11eb-889f-8bb2497c146a.png)

After defining the problem and putting it in context through the user scenario and persona, we conducted an analysis of competitors to examine apps similar to what we wanted to develop and areas we could improve upon in our app.

![image4](https://user-images.githubusercontent.com/60686512/125177315-0b622180-e1db-11eb-9bc9-12957ed45efb.png)

After the analysis, we brainstormed on ideas to solve these problems, developed the information architecture and user journey, and started working on the low-fidelity and high-fidelity wireframes on Figma.

![image5](https://user-images.githubusercontent.com/60686512/125177317-0d2be500-e1db-11eb-80e4-6ef274e08901.png)
![image6](https://user-images.githubusercontent.com/60686512/125177318-0f8e3f00-e1db-11eb-9bde-86d4862fe6ba.png)
![image7](https://user-images.githubusercontent.com/60686512/125177321-11f09900-e1db-11eb-8135-3a7e5c233967.png)
![image8](https://user-images.githubusercontent.com/60686512/125177322-13ba5c80-e1db-11eb-8ef9-55567989e0d8.png)

> **Challenges**

During the project, many members of the team left at different stages of the project. In a team of eight, five members left the project, leaving just three members from the UX track to continue with the project. We became demotivated and considered quitting too, especially after the leader of the team who had been coordinating the project excellently, left as well. We contacted the Techlabs Administrators about the problem and fortunately for us, we received two new members who were willing to join the project. At first, it was tough continuing the project midway with new members and establishing communication with them, we lost momentum and feared we might not be able to meet up with the timeline. However, we were able to come together as a team and pick up from where we left off. Both Timea and Steph from the web development track were great additions to the team, pushed us forward and worked efficiently to ensure that we did not lag in meeting the timelines.

**Our little wins**

- Regaining motivation to continue the project
- Collaborating with new members half-way into the project and completing the project successfully

---

## Frontend

I joined the team right before the mid-term presentation, which means I got only 4 weeks to deliver a working application. The previous frontend developer had started to build the app in Create React App, and the markup for a few components was already written. I didn't want to remove everything that she had wrote previously, instead I decided to refactor the code, because as it turned out it didn't match the design wireframe. I also noticed that the wireframe is of a mobile application, not web. After discussing the situation with the UX team, we decided to go for a web application that is designed mainly for small screens - for people on the go.

### Semantic tags and web accessibility

The first set of problems appeared when I had to write the markup. I am passionate about web accessibility, and my previous experience with coding websites was that the markup and semantic tags are pretty straightforward. Well, it's not the case with mobile app designs. It could have been easier if I just used `div` in most cases, but I insisted on applying semantic tags whenever possible, so that users with screen readers or other assistive technologies can also read and follow the content. Therefore the markup took me much more time than I expected, but it also helped me learn even more about the proper usage of semantic tags and how screen readers operate.

| Which tags would you use for these elements?                                                                        |
| ------------------------------------------------------------------------------------------------------------------- |
| ![wireframe](https://user-images.githubusercontent.com/68846287/125176214-02b91d80-e1d2-11eb-8241-4fb632ba1792.png) |

### Forms and React

The main functionality of our application is the form that users can fill out to request a wine recommendation based on their inputs. This is when I learned about the concept of uncontrolled vs. controlled components. Apparently, you can rely on the DOM handling the form data, as it would normally happen with HTML and vanilla JS, but your React application won't have access to this data. Since I wanted more control over the form inputs, I went for a controlled component. Manually handling the state of each and every form input value is really cumbersome, thankfully there are libraries out there to make it easier for us. Formik seemed the most comprehensive and intuitive to me, and it lived up to my expectations.

I decided to first redirect the users to the result page, forward the form inputs as well and send the request with the form data to the backend here, on the result page. Our mentor suggested that it would be even better if I sent the form data in the URL, so the users could share the link of their search result, which would contain their search query. Unfortunately React Router doesn't offer a solution for this problem, so I had to use the browsers built-in URLSearchParams API. First add the form input values to this object, convert the whole thing into a string then forward it in the URL, and finally convert it back to an object on the other side.

### Styling custom input elements

I wanted to try out Sass for a long time and this project offered the perfect opportunity. By the time I got to the styling, we were already in the last one and a half week of the project phase. I didn't have time to dive too deep into all the functionalities that Sass offers, I tried to keep it safe with just basic mixins and variables, but it was already a lot more convenient than CSS.

Everything went smoothly, until The Form... then it all went downhill. Remember my obsession with web accessibility? Customizing input elements is plain hell. I learned for example that the most popular solution to customize checkboxes is actually bad practice, along with many other solutions out there offering customization on input elements. Let's look at the most popular one: using `display: none` on the input element, then styling the corresponding label tag. The problem is that with `display: none` we hide the checkbox so well, that even screen readers won't be able to see it, they'll just read the label tag and move on to the next field, leaving no chance for the user.
If one insists on semantic tags and proper accessible usage, certain customizations are simply not possible, or require so much code that in the end it's just not worth it.

For a reference, the form consists of 7 input fields and 2 buttons, and even though they look consistent and similar - almost every one of them has slightly different style or behaviour, meaning I couldn't just create one component to repeat it 7 times.
In the end for some of these elements I added Material-UI components, that I customized some more to match the prototype look.

| The form                                                                                                                   | More filters                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![mobile-finished1](https://user-images.githubusercontent.com/68846287/125176137-6e4ebb00-e1d1-11eb-97fa-43eba3f27784.png) | ![mobile-finished2](https://user-images.githubusercontent.com/68846287/125176140-7149ab80-e1d1-11eb-9d39-98b5c84f2679.png) |

It was a great, although very stiff learning curve for me. If I had more prior knowledge or experience, I could have discussed this with the UX team, could have asked them to reconsider these components. But this is why we are here, to gain all of these experiences.

### Tech stack

- ReactJS (Create React App + React Router)
- Sass
- Axios
- Formik
- Material-UI

---

## Backend

### Diving into express and MongoDB

'Diving in' is quite representative of my exposure to What the Wine. I unconventionally joined the team with only four weeks left to the deadline and my frontend teammate, Timea, joined one week before I had. Prior to us joining, What the Wine had been left with no web developers.

Over the course of the first week of joining, the UX team caught us up on the MVP. The UX team had comprehensive diagrams, wireframes, and options for the MVP. It was challenge to fully understand how the app would align to the UX designs, a theme that carried throughout the project phase, caused by several reasons. As we lost more team members to the team, specifically the data scientists, Timea and I had to refractor our architecture to meet the needs to the UX designs. In addition, the time constraint we were working against became more visible and our final decision was to cut some features from the MVP.

Although it was challenging, it was neither impossible nor unachievable. What we had as an advantage was our thoroughness in communication and motivation. Throughout the four weeks, not only did Timea and I work closely together, through pair programming sessions, meeting updates, and brainstorming meetings, but Ngoc from the UX team was extremely responsive to working with us, answering our questions, and brainstorming to modify the MVP whenever Timea and I realized whatever feature at the time was not possible.

Finally, I would be remiss if I did not mention our team mentor Rodolfo, who was as involved with the project as we were. Rodolfo was not only a mentor, but a teacher to us. He reviewed every one of our pull requests, giving us a more deep and thorough insight into the theory and practice of JavaScript, and in general, programming. He participated in meetings and offered his time to guide Timea and I through pair programming sessions.

### Technical journey

Joining the team mid project phase, part of my onboarding was to understand the current state of the code. After understanding the code that was there, a skeleton for backend, instead of refracturing, I decided to rewrite it. At first, I did want to keep the code written by the former backend developer, but I quickly discovered that in order to incorporate the tech stack we decided on, it would be better to start from scratch.

---

## Final thoughts

We've had a quite exciting project journey to look back on. Despite the many (and also sudden) challenges we experienced and even though we weren't able to bring all of our ideas to life, we are super happy with what we achieved within this short time and with the skills we picked up along the way! We certainly were all impressed with what we were capable of creating, which has truely inspired and motivated us to keep exploring in the world of tech. All in all, it was a great experience to learn and grow together as a team and to be part of the TechLabs community! 
