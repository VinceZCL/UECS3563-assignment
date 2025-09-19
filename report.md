## Evaluation and Analysis
A short report on analysing and evaluating features with regards to **Final Year Project 2**

### Specific choice of API endpoints and/or parameters
It is best to utilise generic name, as it follows the *RESTful API* best practices  
Such as the group of endpoints under `/api/users`, any API related to users can be grouped under it  
In this application, there are three primary groups of endpoints:
1. `/api/users` for user handling
2. `/api/reports` for Scrum reports
3. `/api/auth` for login

### API Endpoints in regards to Business Logic
By visualising the business requirements roughly provided from **Final Year Project 1**  
Since the primary role of the *backend* is to provide data by handling *database* repositories  
The primary focus is on what should be displayed to the end-user  
Such as the key requirements of handling Scrum reports, thus the `/api/reports/` **API endpoints** is crucial  

### Choice of Components and Routes for Frontend
Mostly following experience of how common web-based application works  
One of the primary concept is separation of concern, where different functionalities should not be grouped together  
Other than the primary root component holding the *navigation bar* as well as the `<router-outlet>` component  
All other components are displayed within the `<router-outlet>` component with each handling their own functionalities  

### Bindings and Directives
Bindings are primary for data displaying, with the most common being interpolation `{{ property }}`  
Another form of binding done is using `formControl` to 
With directives such as `@if` to check if certain data is available, or check roles for **Role-Based Access Control**  
Another directive being `@for` is used to display large amount of data, such as the Scrum reports of this assignment  

### HTTP Client Calls
The primary functions handling API calls are grouped within services following the convention of `/src/app/services/<service>.ts`  
Then, the actual component in which the service functions were called, depends on where it is needed  
Primarily due to the handling of, and subscribing to `Observer<>` objects is difficult to handle  

### Reactive Forms Design and Validation
Forms are designed mostly based on needs, such as where the **login** functionality requires a username and password  
As for validation, primarily based on what data is needed for the **backend API**, such as both *username* and *password* is required for **login**  
Another validation which is custom-designed is a *confirm password* functionality where this field must be the same as the *password* field  

### Relation to End-User UI
The end users shall not be concerned with the backend as the design should follow the requirements and not the other way around  
But in terms of design, it is started with the *database* first, then the *backend*, then the *frontend*  
Here are the considerations in regards to end users
1. **Database** - What data does the end user wish to see in regards to each functionality?
2. **Backend** - How do we retrieve the data from a normalised *database* tables, submit data into the *database* based on user inputs  
3. **Frontend** - How do we allow the end users to submit the data required, and to view the data retrieved?  

## Other Considerations
Here are other considerations not specifically mentioned within the assignment, but worth noting down  

### Toned down version
Since the title is borrowed from our **Final Year Project**  
This project is roughly a toned down version of the **Final Year Project** title proposed  
Key functionalities are shared, but simplified to fulfill assignment requirements  
Useful features and/or code snippets can be reused when developing **Final Year Project 2**  
As such, this can be considered a very early prototype of **Final Year Project 2**, as we needed to make sure it functions  

### Satisfy Requirements
The assignment has requirements for both the **backend** and the **frontend** implementation  
However, there is the case where some requirements are not completely compatible with the project title  
Some clever workarounds are used to ensure these requirements are achieved, even though some and not all  
The appearance of the implementation that satisfies the requirements are scattered to whereever deemded fitting, and minor at best  

### Detachment from Workshops
This assignment is meant as the evaluation of the workshop sessions provided by **DreamCatcher Consulting**  
There are certain implementation however that were not specifically focused on within the workshops  
Some self-learning is done to implement these features, which includes and are not limited to the following:
1. **Piping** - Using pipes to modify displayed data to be of a specific format, e.g. `{{ report.submitted_at | date: 'dd MMMM yyyy' }}`
2. **Forking** - Using `forkjoin` of the `Rxjs` library to call to multiple **API endpoints**, combining `Observers<>` to obtain a complete set of data  

### Use of Artificial Intelligence
The use of **Artificial Intelligence** are kept as minimum as possible  
The use primarily touches on the concepts not focused within the workshop, such as those pointed out in [Detachment](#detachment-from-workshops)  
Otherwise, **Artificial Intelligence** is solely used for the generation of **CSS** and prettifying *templates*  

### Use of Docker
Working as an intern has allowed me to directly experience using **Docker**, starting images and even writing and creating them  
While **DreamCatcher Consulting** had also provided a workshop for using **Docker**, the **Docker** system implemented within this project was done before, in which you may check the *Commit Logs* for proof  
The reason **Docker** was employed was due to ease of distribution, where it could be easily shared to others, primarily the examiners for this assignment  