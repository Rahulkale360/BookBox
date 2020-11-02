export class AppSettings {
    public static  API_BASE = "http://skunkworks.ignitesol.com:8000/";   
}

export class APIs {
    public static GET_BOOKS = AppSettings.API_BASE + 'books?mime_type=image'; 
}

export class ErrorMessages {
    public static SOME_ERROR_OCCURED = "Some error occured.";
    public static NO_VIEWABLE_VERSION = "No viewable version available.";
}

export class Labels{
    public static APP_TITLE = "Gutenburg Project";
    public static APP_DESCRIPTION = "A social cataloging website that allows you to freely search its database of books, annotation and reviews";
    public static SEARCH_PLACEHOLDER = "Search";
}

