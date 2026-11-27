/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/Settings` | `/Settings`; params?: Router.UnknownInputParams; } | { pathname: `/preferences/MultiSelectScreen`; params?: Router.UnknownInputParams; } | { pathname: `/preferences/TextInputScreen`; params?: Router.UnknownInputParams; } | { pathname: `/preferences`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/Settings` | `/Settings`; params?: Router.UnknownOutputParams; } | { pathname: `/preferences/MultiSelectScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/preferences/TextInputScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/preferences`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/Settings${`?${string}` | `#${string}` | ''}` | `/Settings${`?${string}` | `#${string}` | ''}` | `/preferences/MultiSelectScreen${`?${string}` | `#${string}` | ''}` | `/preferences/TextInputScreen${`?${string}` | `#${string}` | ''}` | `/preferences${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString | Router.ExternalPathString | `/` | `/_sitemap` | `${'/(tabs)'}/Settings` | `/Settings` | `/preferences/MultiSelectScreen` | `/preferences/TextInputScreen` | `/preferences`; params?: Router.UnknownInputParams; };
    }
  }
}
