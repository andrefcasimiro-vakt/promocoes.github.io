import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
         colors: {
            primary: string;
            primaryDark: string;
            secondary: string;
            secondaryDark: string;
            light: string;
            lidl: string;
            pingodoce: string;
            continente: string;
         },
         fontSize: {
            default: string;
         },
         spacing: {
            extraSmall: string;
            small: string;
            medium: string;
            large: string;
         }
    }
}
