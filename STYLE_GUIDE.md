# STYLE GUIDE GISMART UI TEAM

## Naming

  ### Code  
  * For naming we are use CamelCase style
  * Class name should start from Capital latter
  * Type definition start from T  
  * Interface definition start from I  
  ### Files  
  * extension: .tsx - for files with jsx code, .ts - for other
  * name start from Capital letter if file export default react component(class cmp or functional cmp) or class 

## Code separation
* Root component folder contain cmp which used in root level or shared between modules
* Project must be split to modules
* Every module must have next structure:  
    ```
    | - module
      | - components
        | - Comp1.tsx
        | - Comp2
          | - Component.tsx  
          | - Container.ts  
          | - styles.ts  
          | - index.ts  
      | - redux
        | - actions.ts
        | - reducer.ts
        | - selects.ts
      | - services
        | - Service1.service.ts
      | - Container.tsx
      | - types.ts
      | - index.ts
    ```
  * components - folder which contain all React cmp specific for this module(See **React component rules** section)
  * redux - folder.
    * selects - file with all selects from store. Select name should start from `get` Select example:  
      ```javascript
        export getName = (state: AppState): string => state.name
      ```
    * actions - contain all actions
    * reducer - definition of module reducer.
  * service - optional folder which store all module services. If service can be used in few modules, so you should put this service to root service folder. Service file name must follow next pattern: `ServiceName.service.ts`
  * Container - entry point to module. Must contain only react switch with definition of all modules routes. Example:  
    ```javascript
    import React from 'react'
    import { Switch, Route, useRouteMatch } from 'react-router-dom'
    import { NotFound } from 'pages'
    import { Cmp1, Cmp2 } from './components'

    export interface IExampleProps {}

    const Example: React.FC<> = () => {
      const { url } = useRouteMatch()

      return (
        <Switch>
          <Route path={`${url}`} exact component={Cmp1} />
          <Route path={`${url}/example`} component={Cmp2} />
          <Route component={NotFound} />
        </Switch>
      )
    }

    export default Example
    ```
  * index:  
    ```javascript
    import Container from './Container'

    export { default as reducer } from './redux/reducer'
    export { IExampleStore } from './types'

    export default Container
    ```
  

## React specific
* Preferable **functional** components
* All calculated variables inside cmp must be wrapped with *useMemo*   
* All functions inside cmp must be wrapped with *useCallback*   
* Hooks ordering:  
1 - useState  
2 - useEffect (first must be which implement will/didMount)  
3 - useCallback  
  

### React component rules:
* Cmp must export default themselves
* Export interface of props. Name must follow next pattern: `I[CmpName]Props`
* Component must follow next template  
  ```javascript
  import React from 'react'

  export interface IExampleProps {
  }

  const Example: React.FC<IExampleProps> = ({}) => {

  }

  export Example
  ```
* **CSS**  
  * [Styled-cmp](https://styled-components.com/) library using for writing styles. [Work with TS](https://styled-components.com/docs/api#typescript)  
  * Styled component write on file `styles.ts`  
* **Redux**  
  * For connect your cmp to redux you must create separate file `Container.ts`. Template:  
    ```javascript
    import { connect } from 'react-redux'

    import Component from './Component'

    const mapStateToProps = () => ({
    })

    const mapDispatchToProps = () => ({
    })

    export default connect(mapStateToProps, mapDispatchToProps)(Component)
    ```
  * If you don\`t need `mapStateToProps` or `mapDispatchToProps` change to null in connect params
  * For select some data from store you must use select function (See **Code separation -> selects** section).  
    ```javascript
      // incorrect
      const mapStateToProps = (state: IRootState) => ({
        name: state.name
      })

      //correct
      const mapStateToProps = (state: IRootState) => ({
        name: getName(state)
      })
    ```
  
* **file or folder?**
  * If your cmp doesn\`t have some of additional files(styles or Container). You must use file `Component.tsx`
  * else. You ,ust use folder with name like your cmp (*First capital*) `Component`
    !!! And import from folder component and component props interface !!!


## Adding alias for path  
  
**All paths in root level should have alias**  
  
* Add to webpack.config to *alias* section  
* Add to tsconfig.json to *paths* section  
* Add to jest.config to *moduleNameMapper* section  
