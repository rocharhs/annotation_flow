# annotation_flow

A tool that helps the user to revise an annotated text dataset with a dynamic interface that minimizes noise on the revision process

## Plan
The interface have two screens:
 * The first screen load a dataset, its just a drag&drop file
    * the file must be on jsonl format, each line must have two keys "text" and "class"
 * The second screen display a random record from the jsonl
   * The text is on a scrollable textbox and the class is the title of the box
   * the user may only use the arrow keys
     * right arrow accepts the classification as correct, it animates the process by painting the border of the box green and moving it right outside the screen and bringing a new one from the bottom
     * left arrow rejects the classification as wrong, it animates the process by painting the border of the box red and moving it left outside the screen and bringing a new one from the bottom
     * up arrow goes back to the previous record, it animates the process by moving the box bottom outside the screen and bringing the old one from the top
   * the number of annotated records is displayed on a top bar with accepted/rejected counts
   * There is a save button at the top bar that saves the revisions as a jsonl file with three keys "text", "class" and "revision"  
   * There is a load button at the top bar that allows to load previously revised records