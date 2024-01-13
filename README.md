# annotation_flow

A tool that helps the user to revise an annotated text dataset with a dynamic interface that minimizes noise on the revision process

## Execution

```bash
uvicorn main:app --reload
```

## Requirements
The interface have four screens:
 * The first screen load a dataset, its just a drag&drop file
    * the file must be on csv format with at least two columns and under 30 Mb
    * The file should have at least one example of each class
    * empty lines on the class are the ones to be annotated
    * ![image](https://github.com/rocharhs/annotation_flow/assets/6074339/13bb7e94-30cf-4fd9-9389-1b46257197f8)
 * The second screen helps identify which column contains the text messages and which column contains the classes to annotate, also a "annotate" button that leads to the third screen
 * The third screen is a loading screen. It displays a progress bar with the number of messages processed versus the total ex.: 190/2000 

 * The forth screen displays the next record from the file to be revised
   * The text is on a scrollable textbox 
   * There is a keyboard image guide on the bottom-right corner
   * There is a side bar with options
     * one of the options is a checkbox called "revision mode", if enabled, lines that are already annotated may be presented
   * the user may use the arrow keys
     * right arrow accepts the classification as correct, it animates the process by painting the border of the box green and moving it right outside the screen and bringing a new one from the bottom
     * left arrow rejects the classification as wrong, it animates the process by painting the border of the box red and moving it left outside the screen and bringing a new one from the bottom
     * up arrow goes back to the previous record, it animates the process by moving the box bottom outside the screen and bringing the old one from the top
     * down arrows skips current box and gets the next, it animates the process by moving the box up outside the screen and bringing a new one from the bottom
   * the number of annotated records is displayed on a top bar with accepted/rejected counts
   * There is a save button at the top bar that saves the revisions as a jsonl file with three keys "text", "class" and "revision"  
   * There is a load button at the top bar that allows to load previously revised records
   * There is a get revised button that retuns only the rows that were annotated as correct

## Technical Details
We have a python backend + html5 frontend

### Backend
The backend has the following functions

* Load File: check if the jsonl file meets the requirements, updates reference on memory
* Next Sample: returns the next sample to be annotated, text and class
* Previous Sample: returns the last annotated sample, text and class
* Annotate: receives a row number and a revision value, it stores the values on memory on a list
* Load Annotation: check if the jsonl file meets thre requirmenets, updates annotation reference on memory 
* Make Revised: retrieve the jsonl rows that were annotated as correct and makes a new file to be downloaded

### Frontend
the frontend has two pages, home page loads the file, second page begins revision process
