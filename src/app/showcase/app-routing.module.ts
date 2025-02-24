import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'setup', loadChildren: () => import('./components/setup/setup.module').then(m => m.SetupModule)},
            {path: 'theming', loadChildren: () => import('./components/theming/theming.module').then(m => m.ThemingModule)},
            {path: 'icons', loadChildren: () => import('./components/icons/icons.module').then(m => m.IconsModule)},
            {path: 'accordion', loadChildren: () => import('./components/accordion/accordiondemo.module').then(m => m.AccordionDemoModule)},
            {path: 'avatar', loadChildren: () => import('./components/avatar/avatardemo.module').then(m => m.AvatarDemoModule)},
            {path: 'autocomplete', loadChildren: () => import('./components/autocomplete/autocompletedemo.module').then(m => m.AutoCompleteDemoModule)},
            {path: 'blockui', loadChildren: () => import('./components/blockui/blockuidemo.module').then(m => m.BlockUIDemoModule)},
            {path: 'badge', loadChildren: () => import('./components/badge/badgedemo.module').then(m => m.BadgeDemoModule)},
            {path: 'breadcrumb', loadChildren: () => import('./components/breadcrumb/breadcrumbdemo.module').then(m => m.BreadcrumbDemoModule)},
            {path: 'button', loadChildren: () => import('./components/button/buttondemo.module').then(m => m.ButtonDemoModule)},
            {path: 'calendar', loadChildren: () => import('./components/calendar/calendardemo.module').then(m => m.CalendarDemoModule) },
            {path: 'captcha', loadChildren: () => import('./components/captcha/captchademo.module').then(m => m.CaptchaDemoModule)},
            {path: 'card', loadChildren: () => import('./components/card/carddemo.module').then(m => m.CardDemoModule)},
            {path: 'cascadeselect', loadChildren: () => import('./components/cascadeselect/cascadeselectdemo.module').then(m => m.CascadeSelectDemoModule)},
            {path: 'carousel', loadChildren: () => import('./components/carousel/carouseldemo.module').then(m => m.CarouselDemoModule)},
            {path: 'chart', loadChildren: () => import('./components/chart/chartdemo.module').then(m => m.ChartDemoModule)},
            {path: 'checkbox', loadChildren: () => import('./components/checkbox/checkboxdemo.module').then(m => m.CheckboxDemoModule)},
            {path: 'chip', loadChildren: () => import('./components/chip/chipdemo.module').then(m => m.ChipDemoModule)},
            {path: 'chips', loadChildren: () => import('./components/chips/chipsdemo.module').then(m => m.ChipsDemoModule)},
            {path: 'codehighlighter', loadChildren: () => import('./components/codehighlighter/codehighlighterdemo.module').then(m => m.CodeHighlighterDemoModule)},
            {path: 'colorpicker', loadChildren: () => import('./components/colorpicker/colorpickerdemo.module').then(m => m.ColorPickerDemoModule)},
            {path: 'colors', loadChildren: () => import('./components/colors/colorsdemo.module').then(m => m.ColorsDemoModule)},
            {path: 'confirmdialog', loadChildren: () => import('./components/confirmdialog/confirmdialogdemo.module').then(m => m.ConfirmDialogDemoModule)},
            {path: 'confirmpopup', loadChildren: () => import('./components/confirmpopup/confirmpopupdemo.module').then(m => m.ConfirmPopupDemoModule)},
            {path: 'contextmenu', loadChildren: () => import('./components/contextmenu/contextmenudemo.module').then(m => m.ContextMenuDemoModule)},
            {path: 'dataview', loadChildren: () => import('./components/dataview/dataviewdemo.module').then(m => m.DataViewDemoModule)},
            {path: 'defer', loadChildren: () => import('./components/defer/deferdemo.module').then(m => m.DeferDemoModule)},
            {path: 'dialog', loadChildren: () => import('./components/dialog/dialogdemo.module').then(m => m.DialogDemoModule)},
            {path: 'divider', loadChildren: () => import('./components/divider/dividerdemo.module').then(m => m.DividerDemoModule)},
            {path: 'dynamicdialog', loadChildren: () => import('./components/dynamicdialog/dynamicdialogdemo.module').then(m => m.DynamicDialogDemoModule)},
            {path: 'dragdrop', loadChildren: () => import('./components/dragdrop/dragdropdemo.module').then(m => m.DragDropDemoModule)},
            {path: 'dropdown', loadChildren: () => import('./components/dropdown/dropdowndemo.module').then(m => m.DropdownDemoModule)},
            {path: 'editor', loadChildren: () => import('./components/editor/editordemo.module').then(m => m.EditorDemoModule)},
            {path: 'fieldset', loadChildren: () => import('./components/fieldset/fieldsetdemo.module').then(m => m.FieldsetDemoModule)},
            {path: 'fileupload', loadChildren: () => import('./components/fileupload/fileuploaddemo.module').then(m => m.FileUploadDemoModule)},
            {path: 'floatlabel', loadChildren: () => import('./components/floatlabel/floatlabeldemo.module').then(m => m.FloatLabelDemoModule)},
            {path: 'filterservice', loadChildren: () => import('./components/filterservice/filterservicedemo.module').then(m => m.FilterServiceDemoModule)},
            {path: 'focustrap', loadChildren: () => import('./components/focustrap/focustrapdemo.module').then(m => m.FocusTrapDemoModule)},
            {path: 'fullcalendar', loadChildren: () => import('./components/fullcalendar/fullcalendardemo.module').then(m => m.FullCalendarDemoModule)},
            {path: 'galleria', loadChildren: () => import('./components/galleria/galleriademo.module').then(m => m.GalleriaDemoModule)},
            {path: 'gmap', loadChildren: () => import('./components/gmap/gmapdemo.module').then(m => m.GMapDemoModule)},
            {path: 'inplace', loadChildren: () => import('./components/inplace/inplacedemo.module').then(m => m.InplaceDemoModule)},
            {path: 'inputmask', loadChildren: () => import('./components/inputmask/inputmaskdemo.module').then(m => m.InputMaskDemoModule)},
            {path: 'inputnumber', loadChildren: () => import('./components/inputnumber/inputnumberdemo.module').then(m => m.InputNumberDemoModule)},
            {path: 'inputswitch', loadChildren: () => import('./components/inputswitch/inputswitchdemo.module').then(m => m.InputSwitchDemoModule)},
            {path: 'inputtext', loadChildren: () => import('./components/inputtext/inputtextdemo.module').then(m => m.InputTextDemoModule)},
            {path: 'inputgroup', loadChildren: () => import('./components/inputgroup/inputgroupdemo.module').then(m => m.InputGroupDemoModule)},
            {path: 'inputtextarea', loadChildren: () => import('./components/inputtextarea/inputtextareademo.module').then(m => m.InputTextareaDemoModule)},
            {path: 'invalid', loadChildren: () => import('./components/invalid/invaliddemo.module').then(m => m.InvalidDemoModule)},
            {path: 'i18n', loadChildren: () => import('./components/i18n/i18n.module').then(m => m.I18NModule)},
            {path: 'knob', loadChildren: () => import('./components/knob/knobdemo.module').then(m => m.KnobDemoModule)},
            {path: 'keyfilter', loadChildren: () => import('./components/keyfilter/keyfilterdemo.module').then(m => m.KeyFilterDemoModule)},
            {path: 'listbox', loadChildren: () => import('./components/listbox/listboxdemo.module').then(m => m.ListboxDemoModule)},
            {path: 'lts', loadChildren: () => import('./components/lts/lts.module').then(m => m.LTSModule)},
            {path: 'megamenu', loadChildren: () => import('./components/megamenu/megamenudemo.module').then(m => m.MegaMenuDemoModule)},
            {path: 'menu', loadChildren: () => import('./components/menu/menudemo.module').then(m => m.MenuDemoModule)},
            {path: 'menubar', loadChildren: () => import('./components/menubar/menubardemo.module').then(m => m.MenubarDemoModule)},
            {path: 'menumodel', loadChildren: () => import('./components/menumodel/menumodeldemo.module').then(m => m.MenuModelDemoModule)},
            {path: 'messages', loadChildren: () => import('./components/messages/messagesdemo.module').then(m => m.MessagesDemoModule)},
            {path: 'multiselect', loadChildren: () => import('./components/multiselect/multiselectdemo.module').then(m => m.MultiSelectDemoModule)},
            {path: 'orderlist', loadChildren: () => import('./components/orderlist/orderlistdemo.module').then(m => m.OrderListDemoModule)},
            {path: 'organizationchart', loadChildren: () => import('./components/organizationchart/organizationchartdemo.module').then(m => m.OrganizationChartDemoModule)},
            {path: 'overlaypanel', loadChildren: () => import('./components/overlaypanel/overlaypaneldemo.module').then(m => m.OverlayPanelDemoModule)},
            {path: 'paginator', loadChildren: () => import('./components/paginator/paginatordemo.module').then(m => m.PaginatorDemoModule)},
            {path: 'panel', loadChildren: () => import('./components/panel/paneldemo.module').then(m => m.PanelDemoModule)},
            {path: 'panelmenu', loadChildren: () => import('./components/panelmenu/panelmenudemo.module').then(m => m.PanelMenuDemoModule)},
            {path: 'password', loadChildren: () => import('./components/password/passworddemo.module').then(m => m.PasswordDemoModule)},
            {path: 'picklist', loadChildren: () => import('./components/picklist/picklistdemo.module').then(m => m.PickListDemoModule)},
            {path: 'primeflex', loadChildren: () => import('./components/primeflex/primeflexdemo.module').then(m => m.PrimeFlexDemoModule)},
            {path: 'progressbar', loadChildren: () => import('./components/progressbar/progressbardemo.module').then(m => m.ProgressBarDemoModule)},
            {path: 'progressspinner', loadChildren: () => import('./components/progressspinner/progressspinnerdemo.module').then(m => m.ProgressSpinnerDemoModule)},
            {path: 'radiobutton', loadChildren: () => import('./components/radiobutton/radiobuttondemo.module').then(m => m.RadioButtonDemoModule)},
            {path: 'rating', loadChildren: () => import('./components/rating/ratingdemo.module').then(m => m.RatingDemoModule)},
            {path: 'ripple', loadChildren: () => import('./components/ripple/rippledemo.module').then(m => m.RippleDemoModule)},
            {path: 'scrollpanel', loadChildren: () => import('./components/scrollpanel/scrollpaneldemo.module').then(m => m.ScrollPanelDemoModule) },
            {path: 'scrolltop', loadChildren: () => import('./components/scrolltop/scrolltopdemo.module').then(m => m.ScrollTopDemoModule) },
            {path: 'selectbutton', loadChildren: () => import('./components/selectbutton/selectbuttondemo.module').then(m => m.SelectButtonDemoModule)},
            {path: 'sidebar', loadChildren: () => import('./components/sidebar/sidebardemo.module').then(m => m.SidebarDemoModule)},
            {path: 'skeleton', loadChildren: () => import('./components/skeleton/skeletondemo.module').then(m => m.SkeletonDemoModule)},
            {path: 'slidemenu', loadChildren: () => import('./components/slidemenu/slidemenudemo.module').then(m => m.SlideMenuDemoModule)},
            {path: 'slider', loadChildren: () => import('./components/slider/sliderdemo.module').then(m => m.SliderDemoModule)},
            {path: 'splitbutton', loadChildren: () => import('./components/splitbutton/splitbuttondemo.module').then(m => m.SplitButtonDemoModule)},
            {path: 'splitter', loadChildren: () => import('./components/splitter/splitterdemo.module').then(m => m.SplitterDemoModule)},
            {path: 'steps', loadChildren: () => import('./components/steps/stepsdemo.module').then(m => m.StepsDemoModule)},
            {path: 'support', loadChildren: () => import('./components/support/support.module').then(m => m.SupportModule)},
            {path: 'tag', loadChildren: () => import('./components/tag/tagdemo.module').then(m => m.TagDemoModule)},
            {path: 'table', loadChildren: () => import('./components/table/tabledemo.module').then(m => m.TableDemoModule)},
            {path: 'tabmenu', loadChildren: () => import('./components/tabmenu/tabmenudemo.module').then(m => m.TabMenuDemoModule)},
            {path: 'tabview', loadChildren: () => import('./components/tabview/tabviewdemo.module').then(m => m.TabViewDemoModule)},
            {path: 'terminal', loadChildren: () => import('./components/terminal/terminaldemo.module').then(m => m.TerminalDemoModule)},
            {path: 'tieredmenu', loadChildren: () => import('./components/tieredmenu/tieredmenudemo.module').then(m => m.TieredMenuDemoModule)},
            {path: 'timeline', loadChildren: () => import('./components/timeline/timelinedemo.module').then(m => m.TimelineDemoModule)},
            {path: 'toast', loadChildren: () => import('./components/toast/toastdemo.module').then(m => m.ToastDemoModule)},
            {path: 'togglebutton', loadChildren: () => import('./components/togglebutton/togglebuttondemo.module').then(m => m.ToggleButtonDemoModule)},
            {path: 'toolbar', loadChildren: () => import('./components/toolbar/toolbardemo.module').then(m => m.ToolbarDemoModule)},
            {path: 'tooltip', loadChildren: () => import('./components/tooltip/tooltipdemo.module').then(m => m.TooltipDemoModule)},
            {path: 'tree', loadChildren: () => import('./components/tree/treedemo.module').then(m => m.TreeDemoModule)},
            {path: 'treetable', loadChildren: () => import('./components/treetable/treetabledemo.module').then(m => m.TreeTableDemoModule)},
            {path: 'tristatecheckbox', loadChildren: () => import('./components/tristatecheckbox/tristatecheckboxdemo.module').then(m => m.TriStateCheckboxDemoModule)},
            {path: 'virtualscroller', loadChildren: () => import('./components/virtualscroller/virtualscrollerdemo.module').then(m => m.VirtualScrollerDemoModule)}
        ], {scrollPositionRestoration: 'enabled'})    
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}