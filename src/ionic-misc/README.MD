## TrackBy: 
By default, *ngFor identifies object uniqueness by reference. If the object reference is broken by updating the content of the object, Angular removes the related DOM node completely and recreate it again even though the actual change required is for only a small part of the DOM node. This issue can be easily solved by using trackBy.

    <li *ngFor="let item of items; trackBy: trackById">{{item.name}}</li>
    ...
    trackById(index, item) {
        return item.id;
    }

## Remove Console.log statements from PROD
    Even if the user's don't see them, console.log statements can negatively affect performance, especially if you 
    have a lot of them firing off during use. This solves that problem.
    
    Put this code into your main.ts file.
    
     if (environment.production) {
      enableProdMode();
      if(window){
        window.console.log=function(){};
      }
    }
        
