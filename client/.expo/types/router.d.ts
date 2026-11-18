/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/preferences/TextInputScreen`; params?: Router.UnknownInputParams; } | { pathname: `/preferences`; params?: Router.UnknownInputParams; } | { pathname: `/preferences/multiSelectScreen`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/preferences/TextInputScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/preferences`; params?: Router.UnknownOutputParams; } | { pathname: `/preferences/multiSelectScreen`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/preferences/TextInputScreen${`?${string}` | `#${string}` | ''}` | `/preferences${`?${string}` | `#${string}` | ''}` | `/preferences/multiSelectScreen${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString | Router.ExternalPathString | `/` | `/_sitemap` | `/preferences/TextInputScreen` | `/preferences` | `/preferences/multiSelectScreen`; params?: Router.UnknownInputParams; };
    }
  }
}
