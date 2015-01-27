/*
    *
    * Wijmo Library 5.20143.27
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    * 
    * Licensed under the Wijmo Commercial License. 
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
declare module wijmo {
    module interop {
        class ControlMetaFactory {
            static CreateProp(propertyName: string, propertyType: PropertyType, bindingMode?: BindingMode, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDescBase;
            static CreateEvent(eventName: string, isPropChanged?: boolean): EventDescBase;
            static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDescBase;
            static findProp(propName: string, props: PropDescBase[]): PropDescBase;
            static findEvent(eventName: string, events: EventDescBase[]): EventDescBase;
            static findComplexProp(propName: string, props: ComplexPropDescBase[]): ComplexPropDescBase;
            static getMetaData(metaDataId: any): MetaDataBase;
            static getClassName(classRef: any): string;
            private static findInArr(arr, propName, value);
        }
        class PropDescBase {
            private _propertyName;
            private _propertyType;
            private _enumType;
            private _bindingMode;
            private _isNativeControlProperty;
            private _priority;
            constructor(propertyName: string, propertyType: PropertyType, bindingMode?: BindingMode, enumType?: any, isNativeControlProperty?: boolean, priority?: number);
            public propertyName : string;
            public propertyType : PropertyType;
            public enumType : any;
            public bindingMode : BindingMode;
            public isNativeControlProperty : boolean;
            public priority : number;
            public shouldUpdateSource : boolean;
            public initialize(options: any): void;
        }
        enum PropertyType {
            Boolean = 0,
            Number = 1,
            Date = 2,
            String = 3,
            Enum = 4,
            Function = 5,
            EventHandler = 6,
            Any = 7,
        }
        function isSimpleType(type: PropertyType): boolean;
        enum BindingMode {
            OneWay = 0,
            TwoWay = 1,
        }
        class EventDescBase {
            private _eventName;
            private _isPropChanged;
            constructor(eventName: string, isPropChanged?: boolean);
            public eventName : string;
            public isPropChanged : boolean;
        }
        class ComplexPropDescBase {
            public propertyName: string;
            public isArray: boolean;
            private _ownsObject;
            constructor(propertyName: string, isArray: boolean, ownsObject?: boolean);
            public ownsObject : boolean;
        }
        class MetaDataBase {
            private _props;
            private _events;
            private _complexProps;
            public parentProperty: string;
            public isParentPropertyArray: boolean;
            public ownsObject: boolean;
            constructor(props: PropDescBase[], events?: EventDescBase[], complexProps?: ComplexPropDescBase[], parentProperty?: string, isParentPropertyArray?: boolean, ownsObject?: boolean);
            public props : PropDescBase[];
            public events : EventDescBase[];
            public complexProps : ComplexPropDescBase[];
            public add(props: PropDescBase[], events?: EventDescBase[], complexProps?: ComplexPropDescBase[], parentProperty?: string, isParentPropertyArray?: boolean, ownsObject?: boolean): MetaDataBase;
            public prepare(): void;
        }
    }
}

declare module wijmo.angular {
    class MetaFactory extends interop.ControlMetaFactory {
        static CreateProp(propertyName: string, propertyType: interop.PropertyType, bindingMode?: interop.BindingMode, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDesc;
        static CreateEvent(eventName: string, isPropChanged?: boolean): EventDesc;
        static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDesc;
        static findProp(propName: string, props: PropDesc[]): PropDesc;
        static findEvent(eventName: string, events: EventDesc[]): EventDesc;
        static findComplexProp(propName: string, props: ComplexPropDesc[]): ComplexPropDesc;
    }
    class PropDesc extends interop.PropDescBase {
        private _scopeBindingMode;
        private _customHandler;
        constructor(propertyName: string, propertyType: interop.PropertyType, bindingMode?: interop.BindingMode, enumType?: any, isNativeControlProperty?: boolean, priority?: number);
        public scopeBindingMode : string;
        public customHandler : (scope: ng.IScope, control: Control, value: any, oldValue: any, link: WjLink) => void;
    }
    class EventDesc extends interop.EventDescBase {
    }
    class ComplexPropDesc extends interop.ComplexPropDescBase {
    }
}

declare module wijmo.angular {
    class WjDirective implements ng.IDirective {
        static _parPropAttr: string;
        static _initPropAttr: string;
        static _initEventAttr: string;
        static _cntrlScopeProp: string;
        static _scopeChildrenProp: string;
        static _optionalAttr: boolean;
        static _angStripPrefixes: string[];
        public link: (scope: ng.IScope, templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, controller: any, transclude: ng.ITranscludeFunction) => any;
        public controller: any;
        public replace: boolean;
        public require: any;
        public restrict: string;
        public scope: any;
        public template: string;
        public transclude: boolean;
        public _property: string;
        public _isPropertyArray: boolean;
        public _ownObject: boolean;
        public _props: PropDesc[];
        public _events: EventDesc[];
        public _complexProps: ComplexPropDesc[];
        public _$parse: any;
        private _stripReq;
        public _controlConstructor : any;
        public _getMetaDataId(): any;
        constructor();
        private _initDirective();
        public _initSharedMeta(): void;
        public _initProps(): void;
        public _initEvents(): void;
        public _createLink(): WjLink;
        public _controllerImpl(controller: any, scope: any, tElement: any): void;
        public _initControl(element: any): any;
        public _isChild(): boolean;
        public _scopeToAttrName(scopeName: string): string;
        public _getComplexPropDesc(propName: string): ComplexPropDesc;
        private _initScopeEvents();
        private _initScopeDescription();
        public _postLinkFn(): (scope: any, tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, controller?: any) => void;
        private _prepareProps();
        private _stripRequire(index);
        static _versionOk(minVer: string): boolean;
    }
    class WjLink {
        public directive: WjDirective;
        public scope: ng.IScope;
        public tElement: ng.IAugmentedJQuery;
        public tAttrs: ng.IAttributes;
        public controller: any;
        public directiveTemplateElement: JQuery;
        public control: any;
        public parent: WjLink;
        private _nonAssignable;
        private _parentPropDesc;
        private _definedProps;
        private _oldValues;
        private _isInitialized;
        private _scopeSuspend;
        private _suspendedEvents;
        constructor();
        public _link(): void;
        public _onChildrenReady(): void;
        private _createInstance();
        private _parentReady(parentLink);
        public _initParent(): void;
        private _notifyReady();
        public _initControl(): any;
        private _prepareControl();
        private _setupScopeWithControlProperties();
        private _initNonAssignable();
        public _suspendScope(): void;
        public _resumeScope(): void;
        public _isScopeSuspended(): boolean;
        public _isAttrDefined(name: string): boolean;
        private _isAppliedToParent;
        public _childInitialized(child: WjLink): void;
        private _initialized();
        private _appliedToParent();
        private _checkRaiseInitialized();
        private _addWatchers();
        private _addEventHandlers();
        private _addEventHandler(eventDesc);
        private _updateScope(eventInfo?);
        private _castValueToType(value, prop);
        private _parseDate(value);
        private _isChild();
        private _getParentProp();
        private _useParentObj();
        private _isParentArray();
        public _safeApply(scope: any, name: any, value: any): void;
        public _shouldApply(scope: any, name: any, value: any): boolean;
        public _canApply(scope: any, name: any): boolean;
        public _nullOrValue(value: any): any;
    }
}

declare module wijmo.angular {
}

declare module wijmo.angular {
    class WjMenuLink extends WjLink {
        public _link(): void;
    }
}

declare module wijmo.angular {
}

declare module wijmo.angular {
}

declare module wijmo.angular {
}

/**
* Contains AngularJS directives for the Wijmo controls.
*
* The directives allow you to add Wijmo controls to
* <a href="https://angularjs.org/" target="_blank">AngularJS</a>
* applications using simple markup in HTML pages.
*
* You can use directives as regular HTML tags in the page markup. The
* tag name corresponds to the control name, prefixed with "wj-," and the
* attributes correspond to the names of control properties and events.
*
* All control, property, and event names within directives follow
* the usual AngularJS convention of replacing camel-casing with hyphenated
* lower-case names.
*
* AngularJS directive parameters come in three flavors, depending on the
* type of binding they use. The table below describes each one:
*
* <dl class="dl-horizontal">
*   <dt><code>@</code></dt>   <dd>By value, or one-way binding. The attribute
*                             value is interpreted as a literal.</dd>
*   <dt><code>=</code></dt>   <dd>By reference, or two-way binding. The
*                             attribute value is interpreted as an expression.</dd>
*   <dt><code>&</code></dt>   <dd>Function binding. The attribute value
*                             is interpreted as a function call, including the parameters.</dd>
* </dl>
*
* For more details on the different binding types, please see <a href=
* "http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-2-isolate-scope"
* target="_blank"> Dan Wahlin's blog on directives</a>.
*
* The documentation does not describe directive events because they are identical to
* the control events, and the binding mode is always the same (function binding).
*
* To illustrate, here is the markup used to create a @see:ComboBox control:
*
* <pre>&lt;wj-combo-box
*   text="ctx.theCountry"
*   items-source="ctx.countries"
*   is-editable="true"
*   selected-index-changed="ctx.selChanged(s, e)"&gt;
*   &lt;/wj-combo-box&gt;</pre>
*
* Notice that the <b>text</b> property of the @see:ComboBox is bound to a controller
* variable called "ctx.theCountry." The binding goes two ways; changes in the control
* update the scope, and changes in the scope update the control. To
* initialize the <b>text</b> property with a string constant, enclose
* the attribute value in single quotes (for example, <code>text="'constant'"</code>).
*
* Notice also that the <b>selected-index-changed</b> event is bound to a controller
* method called "selChanged," and that the binding includes the two event parameters
* (without the parameters, the method is not called).
* Whenever the control raises the event, the directive invokes the controller method.
*/
declare module wijmo.angular {
}

