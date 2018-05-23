/// <reference path="jquery-1.8.3-vsdoc.js" />

/// ErkmenEsen 2018

var SortDirection = {
    Ascending: "asc",
    Descending: "desc"
}

var EditType = {
    Batch: "batch",
    Row: "row",
    PopUp: "popup"
}

var SourceType = {
    JSON: "json",
    URL: "url",
    XML: "xml"
}

var Align = {
    Left: "left",
    Right: "right",
    Center: "center"
}

var Types = {
    Boolean: typeof true,
    String: typeof "",
    Number: typeof 0,
    Object: typeof {},
    Undefined: typeof undefined,
    Function: typeof function () { }
};

var Aggregate = {
    Sum: "sum",
    Count: "count",
    Avarage: "avarage"
};

var SearchCriteria = {
    StartWith: "~",
    Contains: "*",
    Equal: "==",
    NotEqual: "!=",
    Less: "<",
    LessAndEqual: "<=",
    Greater: ">",
    GreaterAndEqual: ">="
};

var UndoStatus = {
    Hidden: 0,
    Visible: 1
};

var RowVersion = {
    UnChanged: 1,
    Added: 2,
    Modified: 3,
    Deleted: 4
};

var DataRole = {
    Text: "text",
    Date: "date",
    Time: "time",
    DateTime: "datetime",
    Numeric: "numeric",
    TrueFalse: "truefalse",
    Currency: "currency",
    Image: "image",
    Link: "link",
    DropDown: "dropdown",
    Custom: "custom",
    Delete: "delete"
};

var HeaderElement = {
    SelectBox: function () { return $("<input type='checkbox' class='selectall' />").clone(); },
    DeleteBox: function () { return $("<div class='deletecol'>-</div>").clone(); },
    SpanBox: function () { return $("<span></span>").clone(); },
    SortBox: function () {
        var sortDiv = $("<div></div>").addClass("small-icon").addClass("sort-both");
        var sortAnc = $("<a href='#'></a>").css("float", "right").css("margin-top", "-1px").attr("data-role", "sort");

        sortAnc.append(sortDiv);

        var anc = $(sortAnc).clone();

        $(anc).bind("click", function () {
            var a = $(this);
            var div = $(this).children();

            if (div.hasClass("sort-asc") || div.hasClass("sort-both")) {
                div.removeClass("sort-asc");
                div.removeClass("sort-both");
                div.addClass("sort-desc");

                a.attr("sort-direction", "desc");
            }
            else {
                div.removeClass("sort-desc");
                div.addClass("sort-asc");

                a.attr("sort-direction", "asc");
            }
        });

        return anc;
    }
};

var CellElement = {
    Span: function (value) { return $("<span></span>").clone().text(value); },
    CheckBox: function (ischecked) {
        var element = $("<input type='checkbox'/>").clone().attr("checked", ischecked);

        $(element).bind("click", function () {
            return false;
        });

        return element;
    },
    Link: function (href, text) {
        var element = $("<a target='_blank'></a>").clone().attr("href", href);

        if (typeof text != Types.Undefined)
            $(element).text(text);
        else
            $(element).text(href)

        return $(element);
    },
    Image: function (src) { return $("<img alt='' />").clone().attr("src", src); },
    CustomElement: function (element) { return $(element); },
    DeleteElement: function () { return $("<a href='#'></a>").append("<div class='small-icon delete-icon'></div>").clone(); }
}

var PagerElements = {
    First: function () {
        var div = $("<div></div>").addClass("middle-icon").addClass("first-icon").clone();
        var link = $("<a href='#'></a>").clone();
        var li = $("<li></li>").addClass("first").clone();
        link.append(div);
        li.append(link);

        return li;
    },
    Next: function () {
        var div = $("<div></div>").addClass("middle-icon").addClass("next-icon").clone();
        var link = $("<a href='#'></a>").clone();
        var li = $("<li></li>").addClass("next").clone();
        link.append(div);
        li.append(link);

        return li;
    },
    Last: function () {
        var div = $("<div></div>").addClass("middle-icon").addClass("last-icon").clone();
        var link = $("<a href='#'></a>").clone();
        var li = $("<li></li>").addClass("last").clone();
        link.append(div);
        li.append(link);

        return li;
    },
    Prev: function () {
        var div = $("<div></div>").addClass("middle-icon").addClass("prev-icon").clone();
        var link = $("<a href='#'></a>").clone();
        var li = $("<li></li>").addClass("prev").clone();
        link.append(div);
        li.append(link);

        return li;
    },
    Page: function (num) {
        var span = $("<span></span>").text(num);
        var div = $("<div></div>").addClass("middle-icon").addClass("page-icon").clone();
        var link = $("<a href='#'></a>").attr("data-page", num).clone();
        var li = $("<li></li>").addClass("page").clone();
        div.append(span);
        link.append(div);
        li.append(link);

        return li;
    },
    RowPerPager: function (options) {
        var dropdown = $("<select></select>").clone().addClass("perrowpager");

        var optList = new List();

        if (typeof options == Types.Undefined)
            optList.AddRange([10, 20, 40, 50, 80, 100]);
        else
            optList.AddRange(options);

        optList.ForEach(function (s) {
            var opt = $("<option></option>").attr("value", s).text(s);

            $(dropdown).append(opt);
        });

        return dropdown;
    }
}

var EditElement = {
    TextBox: function (value) { return $("<input class='editTextBox' type='text' />").clone().val(value); },
    NumericBox: function (value) { return $("<input class='editNumericBox' type='text' />").clone().val(value); },
    DateBox: function (value) { return $("<input class='editDateBox' type='text' />").clone().val(value); },
    TimeBox: function (value) { return $("<input class='editTimeBox' type='text' />").clone().val(value); },
    DateTimeBox: function (value) { return $("<input class='editDateTimeBox' type='text' />").clone().val(value); },
    CheckBox: function (value) { return $("<input class='editCheckBox' type='checkbox' />").clone().val(value); },
    CurrencyBox: function (value) { return $("<input class='editCurrencyBox' type='text' />").clone().val(value); },
    ImageBox: function (value) { return $("<input class='editImageBox' type='text' />").clone().val(value); },
    LinkBox: function (value) { return $("<input class='editLinkBox' type='text' />").clone().val(value); },
    DropDown: function () { return $("<select class='editDropDownBox'><option>Seçiniz...</option</select>").clone(); }
};

String.Format = function (args) {
    args = String.Format.arguments;
    var index = 1;
    var exp = args[0].replace(/{\d+}/g, function (match, number) {
        var result = typeof args[index] != 'undefined' ? args[index] : match;
        index++
        return result;
    })

    return exp;
}

Date.Now = function () {
    return new Date()
}(Date)

Boolean.prototype.Equals = function (value) {
    if (this.valueOf() === value)
        return true
    else
        return false;
}

String.prototype.Equals = function (str) {
    if (this.valueOf() === str)
        return true
    else
        return false;
}

Number.prototype.Equals = function (number) {
    if (this.valueOf() === number)
        return true;
    else
        return false;
}

String.prototype.CompareTo = function (str) {
    var val1 = this.valueOf();
    var val2 = str.valueOf();

    var val1Len = 0;
    var val2Len = 0;

    for (var i = 0; i < val1.length; i++) {
        val1Len += val1[i].charCodeAt();
    }

    for (var i = 0; i < val2.length; i++) {
        val2Len += val2[i].charCodeAt();
    }

    if (val1Len > val2Len)
        return 1;
    else if (val1Len < val2Len)
        return -1;
    else
        return 0;
}

Number.prototype.CompareTo = function (nm) {
    var val1 = this.valueOf();
    var val2 = nm;

    if (val1 > val2)
        return 1;
    else if (val1 < val2)
        return -1;
    else
        return 0;
}

Boolean.prototype.CompareTo = function (bool) {
    var val1 = this.valueOf();
    var val2 = bool;

    if (val1 && !val2)
        return 1;
    else if (!val1 < val2)
        return -1;
    else
        return 0;
}

String.prototype.Contains = function (str) {
    return this.indexOf(str) > -1;
}

String.prototype.StartWith = function (str) {
    return str.substr(0, str.length) === this.substr(0, str.length);
}

Object.defineProperty(Object.prototype, "GetType", {
    value: function () {
        return typeof this.valueOf();
    }
});

Object.defineProperty(Object.prototype, "CompareTo", {
    value: function (obj) {
        if (typeof obj.valueOf() === "string" ||
            typeof obj.valueOf() === "number" ||
            typeof obj.valueOf() === "boolean") {

            var val1 = this.valueOf();
            var val2 = obj.valueOf();

            return val1.CompareTo(val2);
        }
        else if (typeof obj.valueOf() === "object") {
            if (this.hasOwnProperty("CompareTo")) {
                var val1 = this.valueOf();
                var val2 = obj.valueOf();

                return val1.CompareTo(val2);
            }
            else {
                return 0;
            }
        }
    }
});

Object.defineProperty(Object.prototype, "Equals", {
    value: function (obj) {
        for (var i in this) {
            if (this[i].valueOf() !== obj[i].valueOf()) {
                return false;
            }
        }

        return true;
    }
});

Object.defineProperty(Object.prototype, "Clone", {
    value: function () {
        var clonedObject = {};

        if (typeof this.valueOf() === "object") {
            for (var i in this) {
                clonedObject[i] = this[i].valueOf();
            }
        }
        else {
            clonedObject = this.valueOf();
        }

        return clonedObject;
    }
});

Object.defineProperty(Object.prototype, "Extend", {
    value: function () {
        return $.extend(true, {}, this);
    }
});

Object.defineProperty(Object.prototype, "HasFunc", {
    value: function (funcName) {
        if (typeof this[funcName] === undefined) {
            return false;
        }
        else {
            return true;
        }
    }
});

var Utils = function () {
    var _uniqueID = function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    var _identity = function () {
        return $.guid++;
    }

    var _eTableGuid = function () {
        return "e-datatable-" + $.guid++;
    }

    var _getId = function (element) {
        return $(element).parents(".e-datatable-container").attr("id");
    }

    var _isCompatible = function (val1, val2, searchCriteria) {
        switch (searchCriteria) {
            case SearchCriteria.Contains:
                return val1.Contains(val2);
            case SearchCriteria.Equal:
                return val1.Equals(val2);
            case SearchCriteria.Greater:
                return val1 > val2;
            case SearchCriteria.GreaterAndEqual:
                return val1 > val2 || val1.Equals(val2);
            case SearchCriteria.Less:
                return val1 < val2;
            case SearchCriteria.LessAndEqual:
                return val1 < val2 || val1.Equals(val2);
            case SearchCriteria.NotEqual:
                return val1 !== val2
            case SearchCriteria.StartWith:
                return val1.StartWith(val2);
            default:
                return false;
        }
    }

    var _getTableBody = function (id) {
        return $("#" + id + " .t-b-container").find("tbody");
    }

    return {
        UniqueId: _uniqueID,
        Identity: _identity,
        EGuid: _eTableGuid,
        GetId: _getId,
        IsCompatible: _isCompatible,
        GetBody: _getTableBody
    }
}(this)

var Culture = function () {
    var _default = {
        all: 'Hepsi',
        yes: 'Evet',
        no: 'Hayır',
        ok: 'Tamam',
        insert: 'Ekle',
        update: 'Güncelle',
        remove: 'Sil',
        removed: 'Silindi',
        show: 'Göster',
        hide: 'Gizle',
        enable: 'Aktif',
        disable: 'Pasif',
        record: 'Kayıt',
        first: 'İlk',
        last: 'Son',
        next: 'Sonraki',
        prev: 'Önceki',
        load: 'Yükle',
        loading: 'Yükleniyor',
        please: 'Lütfen',
        error: 'Hata',
        succesfully: 'Başarılı',
        ignore: 'Görmezden gel',
        skip: 'Atla',
        fail: 'Başarısız',
        search: 'Ara',
        found: 'Bulundu',
        undo: 'Geri Al',
        day: 'Gün',
        month: 'Ay',
        year: 'Yıl',
        save: 'Kaydet',
        cancel: 'İptal',
        abort: 'Vazgeç',
        open: 'Aç',
        close: 'Kapat',
        wait: 'Bekleyin',
        waiting: 'Bekleniyor'
    }

    return {
        Default: _default
    }
}(this)

var Grouping = function (key, elements) {
    this.Key = key,
    this.Elements = elements
}

var List = function (list) {
    var arr = [];

    if (list) {
        if (list instanceof Array) {
            for (var i = 0; i < list.length; i++) {
                arr.push(list[i]);
            }
        }
        else if (list instanceof List) {
            var _tmpArray = list.ToArray();

            for (var i = 0; i < _tmpArray.length; i++) {
                arr.push(_tmpArray[i]);
            }
        }
    }

    var Loop = {
        Continue: true,
        Break: false
    }

    var _lambda2func = function (exp) {
        if (exp == null) return function (x) { return x; };

        if (typeof exp == Types.String) {
            if (exp !== "" && exp.indexOf("=>") !== -1) {
                var expr = exp.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);

                return new Function(expr[1], "return " + expr[2]);
            }
        }

        return exp;
    }

    var _createFunc = function (exp) {
        var func = {};

        if (typeof exp == Types.String) {
            func = _lambda2func(exp);
        }
        else if (typeof exp == Types.Function) {
            func = exp;
        }
        else {
            throw Error(exp + " is not expression");
        }

        return func;
    }

    var _propName = function (func) {
        return func.toString().split("{")[1].split("}")[0].split(".")[1].trim();
    }

    var _any = function (predicate) {
        var result = false;

        var execFunc = _createFunc(predicate);

        _foreach(function (s) {
            if (execFunc(s)) {
                result = true;

                return Loop.Break;
            }
        });

        return result;
    }

    var _all = function (predicate) {
        var result = true;

        var execFunc = _createFunc(predicate);

        _foreach(function (s) {
            if (!execFunc(s)) {
                result = false;

                return Loop.Break;
            }
        });

        return result;
    }

    var _first = function (predicate) {
        if (predicate === Types.Undefined)
            return arr[0];

        var execFunc = _createFunc(predicate);

        for (var i = 0; i < arr.length; i++) {
            if (execFunc(arr[i])) {
                return arr[i];
            }
        }

        throw Error('No Contains Element');
    }

    var _firstOrDefault = function (predicate) {
        var result = null;

        var execFunc = _createFunc(predicate);

        _foreach(function (s) {
            if (execFunc(s)) {
                result = s;

                return Loop.Break;
            }
        });

        return result;
    }

    var _where = function (predicate) {
        var result = [];

        var execFunc = _createFunc(predicate);

        _foreach(function (s) {
            if (execFunc(s)) {
                result.push(s);
            }
        });

        return new List(result);
    }

    var _action = function (action) {
        var execFunc = _createFunc(action);

        _foreach(function (s) {
            execFunc(s);
        });
    }

    var _indexof = function (obj) {
        var index = -1;

        _foreach(function (s, idx) {
            if (s.Equals(obj)) {
                index = idx;

                return Loop.Break;
            }
        });

        return index;
    }

    var _contains = function (obj) {
        var result = false;

        _foreach(function (s) {
            if (s.Equals(obj)) {
                result = true;

                return Loop.Break;
            }
        });

        return result;
    }

    var _add = function (obj) {
        arr.push(obj);
    }

    var _addRange = function (array) {
        for (var i = 0; i < array.length; i++) {
            _add(array[i]);
        }
    }

    var _remove = function (obj) {
        _foreach(function (s) {
            if (s == obj) {
                delete s;

                return Loop.Break;
            }
        });
    }

    var _removeAll = function () {
        _foreach(function (s) {
            _remove(s);
        });
    }

    var _removeAt = function (index) {
        delete arr[index];
    }

    var _copyTo = function () {
        return new List(arr);
    }

    var _clone = function () {
        var clonedArray = [];

        _foreach(function (s) {
            clonedArray.push(s.Clone());
        });

        return new List(clonedArray);
    }

    var _foreach = function (callback) {
        for (var i = 0; i < arr.length; i++) {
            if (typeof arr[i] !== Types.Function) {
                var status = callback(arr[i], i);

                if (status !== undefined && !status) {
                    break;
                }
            }
        }
    }

    var _join = function (inner, outerKey, innerKey, resultSelector) {
        var lst = new List();

        var _outerKey = _createFunc(outerKey);
        var _innerKey = _createFunc(innerKey);
        var _resultSelector = _createFunc(resultSelector);

        var _inner = inner.ToArray();

        for (var i = 0; i < arr.length; i++) {
            for (var o = 0; o < _inner.length ; o++) {
                try {
                    if (_outerKey(arr[i]).Equals(_innerKey(_inner[o]))) {
                        lst.Add(_resultSelector(arr[i], _inner[o]));
                    }
                } catch (e) {

                }
            }
        }

        return lst;
    }

    var _distinct = function (predicate) {
        var disVal = [];

        var execFunc = _createFunc(predicate);

        _foreach(function (s) {
            if (disVal.indexOf(execFunc(s)) == -1) {
                disVal.push(execFunc(s));
            }
        });

        return new List(disVal);
    }

    var _groupBy = function (predicate) {
        var grouppedArray = [];

        var execFunc = _createFunc(predicate);

        var distinctElements = _distinct(execFunc).ToArray();
        var colName = _propName(execFunc);

        for (var i = 0; i < distinctElements.length ; i++) {
            var key = distinctElements[i];
            var elements = _where(function (s) { return s[colName] == distinctElements[i]; });

            grouppedArray.push(new Grouping(key, elements));
        }

        return grouppedArray;
    }

    var _sum = function (predicate) {
        var execFunc = _createFunc(predicate);

        var result = execFunc(arr[0]);

        _foreach(function (s) {
            result += execFunc(s);
        });

        return result;
    }

    var _select = function (predicate) {
        var result = [];

        var execFunc = _createFunc(predicate);

        _foreach(function (s) {
            result.push(execFunc(s));
        });

        return new List(result);
    }

    var _count = function (predicate) {
        var _c = 0;

        if (predicate) {
            var execFunc = _createFunc(predicate);

            _foreach(function (s) {
                if (execFunc(s))
                    _c++;
            });
        }
        else {
            _c = arr.length;
        }

        return _c;
    }

    var _toArray = function () {
        return arr;
    }

    var _skip = function (count) {
        var result = arr.slice(count, arr.length);

        return new List(result);
    }

    var _take = function (count) {
        var result = arr.slice(0, count);

        return new List(result);
    }

    var _elementAt = function (index) {
        return arr[index];
    }

    var _sort = function (predicate, direction) {
        if (typeof predicate !== Types.Undefined) {
            var execFunc = _createFunc(predicate);
            var propName = _propName(execFunc.toString());

            if (typeof direction == Types.Undefined) {
                arr.sort(function (a1, a2) {
                    return a1[propName].CompareTo(a2[propName]);
                });
            }
            else {
                if (direction == "asc") {
                    arr.sort(function (a1, a2) {
                        return a1[propName].CompareTo(a2[propName]);
                    });
                }
                else if (direction == "desc") {
                    arr.sort(function (a1, a2) {
                        
                        return a2[propName].CompareTo(a1[propName]);
                    });
                }
            }
        }
        else if (typeof predicate === Types.Undefined) {
            arr.sort(function (a1, a2) {
                return a1.CompareTo(a2);
            });
        }
    }

    var _reverse = function () {
        arr.reverse();
    }

    return {
        Action: _action,
        Add: _add,
        AddRange: _addRange,
        Any: _any,
        All: _all,
        Clone: _clone,
        CopyTo: _copyTo,
        Count: _count,
        Contains: _contains,
        Distinct: _distinct,
        ElementAt: _elementAt,
        First: _first,
        FirstOrDefault: _firstOrDefault,
        ForEach: _foreach,
        GroupBy: _groupBy,
        IndexOf: _indexof,
        Join: _join,
        Remove: _remove,
        RemoveAt: _removeAt,
        RemoveAll: _removeAll,
        Reverse: _reverse,
        Select: _select,
        Skip: _skip,
        Sum: _sum,
        Sort: _sort,
        Take: _take,
        ToArray: _toArray,
        Where: _where
    };
}

var Convert = function () {
    var ToBooleanConvert = function () {
        this.ToBoolean = function (obj) {
            var _type = DedectType.GetType(obj);

            switch (_type) {
                case Types.Boolean:
                    return obj;
                case Types.Function:
                    throw Error("Function to Boolean Not Converted");
                case Types.Number:
                    if (obj.valueOf() > 0)
                        return true;
                    else
                        return false;
                case Types.String:
                    if (obj.valueOf() === "True" || obj.valueOf() === "true")
                        return true;
                    else if (obj.valueOf() === "False" || obj.valueOf() === "false")
                        return false;
                    else
                        throw Error(obj.valueOf() + " To Boolean Not Converted");
                case Types.Object:
                    throw Error("Object To Boolean Not Converted");
            }
        }

        return this;
    }

    var ToStringConvert = function () {
        this.ToString = function (obj) {
            var _type = DedectType.GetType(obj);

            switch (_type) {
                case Types.Boolean:
                case Types.Function:
                case Types.Number:
                case Types.String:
                case Types.Object:
                    return obj.toString();
            }
        }

        return this;
    }

    var ToNumberConvert = function () {
        this.ToNumber = function (obj) {
            var _type = DedectType.GetType(obj);

            switch (_type) {
                case Types.Boolean:
                    if (obj)
                        return 1;
                    else
                        return 0;
                case Types.Function:
                    throw Error("Function To Number Not Converted");
                case Types.Number:
                    return obj;
                case Types.String:
                    return parseFloat(obj.valueOf());
                case Types.Object:
                    throw Error("Object To Number Not Converted");
                    break;
            }
        }

        return this;
    }

    var _changeType = function (type, value) {
        if (type === undefined) return null;

        switch (type) {
            case "boolean":
                return _toBoolean.ToBoolean(value);
            case "string":
                return _toString.ToString(value);
            case "number":
                return _toNumber.ToNumber(value);
            default:
                return null;
        }
    }

    var ToFunctionConvert = function () {
        this.ToFunction = function (obj) {
            var _type = DedectType.GetType(obj);

            switch (_type) {
                case Types.Boolean:
                case Types.Function:
                case Types.Number:
                case Types.String:
                case Types.Object:
                    return new Function("", obj);
            }
        }

        return this;
    }

    var DedectType = function () {
        var _getType = function (obj) {
            switch (obj.GetType()) {
                case "function":
                    return Types.Function;
                case "boolean":
                    return Types.Boolean;
                case "string":
                    return Types.String;
                case "number":
                    return Types.Number;
                case "object":
                    return Types.Object;
                case "undefined":
                    return Types.Undefined;
            }
        }

        return {
            //Return : Type
            GetType: _getType
        }
    }(this)

    var _toBoolean = new ToBooleanConvert();
    var _toString = new ToStringConvert();
    var _toNumber = new ToNumberConvert();
    var _toFunction = new ToFunctionConvert();

    return {
        ToBoolean: function (obj) {
            return _toBoolean.ToBoolean(obj);
        },
        ToString: function (obj) {
            return _toString.ToString(obj);
        },
        ToNumber: function (obj) {
            return _toNumber.ToNumber(obj);
        },
        ToFunction: function (obj) {
            return _toFunction.ToFunction(obj);
        },
        ChangeType: function (type, value) {
            return _changeType(type, value);
        }
    }
}(window);

var objList = new List()
var displayData = new List();

var DataSource = function (sourceType) {
    if (typeof sourceType === Types.Undefined) sourceType = "json";

    var _dataProcessJson = function (data) {
        if (typeof data === Types.String)
            return new List(JSON.parse(data))
        else if (typeof data === Types.Object)
            return new List(data);
    }

    var _dataProcessXml = function (data) {
        return new List();
    }

    var _dataProcessUrl = function (srcUrl) {
        var responseData = {}

        $.ajax({
            url: srcUrl,
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                responseData = data;
            },
            error: function (err) {
                alert(err.responseText);
            }
        });

        return new List(responseData);
    }

    var _getData = function (source) {
        if (typeof source === Types.Undefined || source === "") return new List();

        switch (sourceType) {
            case SourceType.JSON:
                return _dataProcessJson(source);
            case SourceType.XML:
                return _dataProcessXml(source);
            case SourceType.URL:
                return _dataProcessUrl(source);
            default:
                alert("No Source");
                break;
        }
    }

    return {
        GetData: _getData
    }
}

var Containers = function () {
    var _pagerContainer = function () {
        return $("<div></div>").clone().addClass("e-pg-container");
    };

    var _headerContainer = function () {
        return $("<div></div>").clone().addClass("e-pg-header");
    };

    var _tableContainer = function () {
        return $("<div></div>").clone().addClass("e-pg-table");
    }

    var _tableHeaderContainer = function () {
        return $("<div></div>").clone().addClass("t-h-container");
    }

    var _tableBodyContainer = function () {
        return $("<div></div>").clone().addClass("t-b-container");
    }

    var _tableFooterContainer = function () {
        return $("<div></div>").clone().addClass("t-f-container");
    }

    var _searchContainer = function () {
        return $("<div></div>").clone().addClass("t-hs-container");
    }

    var _undoContainer = function () {
        return $("<div></div>").clone().addClass("t-hu-container");
    }

    var _footerContainer = function () {
        return $("<div></div>").clone().addClass("e-f-container");
    }

    return {
        PagerContainer: _pagerContainer,
        HeaderContainer: _headerContainer,
        TableContainer: _tableContainer,
        TableHeaderContainer: _tableHeaderContainer,
        TableBodyContainer: _tableBodyContainer,
        TableFooterContainer: _tableFooterContainer,
        SearchContainer: _searchContainer,
        UndoContainer: _undoContainer,
        FooterContainer: _footerContainer
    };

}(this)

var DataProcess = function () {
    var _getFullData = function (tableObjId) {
        var tableObj = objList.FirstOrDefault(function (s) { return s.Id == tableObjId });

        return tableObj.Data;
    }

    var _getUsableData = function (tableObjId) {
        var tableObj = objList.FirstOrDefault(function (s) { return s.Id == tableObjId });

        var opt = tableObj.Options;
        var data = tableObj.Data;

        if (opt.RowVersion) {
            data = data.Where("s=>s.RowVersion!=='Deleted'");
        }

        if (opt.Undo) {
            data = data.Where("s=>s.UndoStatus!==0");
        }

        return data;
    }

    var _findData = function (tableObjId, criteria, searchContent) {

        var datas = _getUsableData(tableObjId);
        var tObj = objList.First(function (s) { return s.Id === tableObjId; });

        var resultDatas = new List();

        if (criteria == "all") {
            datas.ForEach(function (s) {
                for (var c in s) {
                    var col = tObj.OriginalColumns.FirstOrDefault(function (a) { return a.Name === c; });

                    var searchCriteria = {};
                    var content = {};

                    if (col != null) {
                        searchCriteria = col.SearchCriteria;
                        try {
                            content = Convert.ChangeType(col.Type, searchContent);
                        } catch (e) {
                            content = searchContent;
                        }
                    }
                    else {
                        searchCriteria = Types.Undefined;
                    }

                    if (searchCriteria !== Types.Undefined) {
                        if (Utils.IsCompatible(s[c], content, searchCriteria)) {
                            resultDatas.Add(s);

                            break;//kolonlardan herhangi biri uyarsa ekleyip bi sonraki satıra geçiyoruz
                        }
                    }
                }
            });
        }
        else {
            resultDatas = datas.Where(function (s) {
                var col = tObj.OriginalColumns.FirstOrDefault(function (a) { return a.Name === criteria; });

                var searchCriteria = {};
                var content = {};

                if (col != null) {
                    searchCriteria = col.SearchCriteria;
                    try {
                        content = Convert.ChangeType(col.Type, searchContent);
                    } catch (e) {
                        content = searchContent;
                    }
                }
                else {
                    searchCriteria = Types.Undefined;
                }

                if (searchCriteria !== Types.Undefined)
                    return Utils.IsCompatible(s[criteria], content, searchCriteria);
                else
                    return false;
            });
        }

        return resultDatas;
    }

    var _getDataForDisplay = function (pageNum, data, opt) {
        var result = {};

        if (opt.Pager) {
            var startIndex = ((pageNum * opt.Pager.RowsPerPage[0])) - opt.Pager.RowsPerPage[0];

            var result = data.Skip(startIndex).Take(opt.Pager.RowsPerPage[0]);
        }
        else {
            result = data;
        }

        return new List(result.ToArray());
    }

    var _updateData = function (id, rowId, dataField, newValue) {
        var tObj = objList.First(function (s) { return s.Id == id; });
        var row = tObj.Data.First(function (s) { return s.RowUID == rowId; });

        var cellEditingEventArgs = new CellEditingEventArgs();
        cellEditingEventArgs.Column = tObj.FullColumns.First(function (s) { return s.Name === dataField; });
        cellEditingEventArgs.NewValue = Convert.ChangeType(typeof row[dataField], newValue);
        cellEditingEventArgs.OldValue = row[dataField];

        EventFire.CellEditing(tObj.Options, cellEditingEventArgs);

        var isCancel = cellEditingEventArgs.Cancel;

        if (!isCancel) {
            row[dataField] = Convert.ChangeType(typeof row[dataField], newValue);

            var cellEditedEventArgs = new CellEditedEventArgs();
            cellEditingEventArgs.Column = tObj.FullColumns.First(function (s) { return s.Name === dataField; });
            cellEditingEventArgs.NewValue = Convert.ChangeType(typeof row[dataField], newValue);
            cellEditingEventArgs.OldValue = row[dataField];

            EventFire.CellEdited(tObj.Options, cellEditedEventArgs);

            return true;
        }

        return false;
    }

    var _updateDataByEditElement = function (editElement) {
        var rowId = TableHelper.GetRowUIDByCell(editElement);
        var dataField = $(editElement).parent().attr("data-field");
        var id = Utils.GetId(editElement);
        var tObj = objList.First(function (s) { return s.Id === id; });
        var col = tObj.OriginalColumns.First(function (s) { return s.Name === dataField; });

        var isValid = true;
        
        var val = TableHelper.GetEditElementValueByRole(editElement, col.Role).value;

        if (col.Validate) {
            var colList = new List(tObj.Options.Columns);
            var colOpt = colList.First(function (s) { return s.name === dataField; });
            var newValue = Convert.ChangeType(col.Type, val);
            isValid = colOpt.validate(newValue);
        }

        if (isValid) {
            var isCancel = _updateData(id, rowId, dataField, val);

            return isCancel;
        }
        else
            $(editElement).addClass("invalid");

        return isValid;
    }

    return {
        FullData: _getFullData,
        UsableData: _getUsableData,
        DisplayData: _getDataForDisplay,
        Find: _findData,
        UpdateData: _updateData,
        UpdateDataByEditElement: _updateDataByEditElement
    }
}(this)

var PagerHelper = function () {
    var _getPageCount = function (rowperpage, datacount) {
        var c = Convert.ToNumber((datacount / rowperpage).toString().split(".")[0]);
        c += (datacount % rowperpage) > 0 ? 1 : 0;

        return c;
    }

    var _getVisiblePageCount = function (tableObj) {
        return $("#" + tableObj.Id).find(".page").length;
    }

    var _perRowPagerDropDown = function (options) {
        return PagerElements.RowPerPager(options);
    }

    var _createPager = function (tableObj) {
        var rowPerPage = tableObj.Options.Pager.RowsPerPage[0];
        var dataCount = tableObj.Data.Count();

        var container = Containers.PagerContainer();

        var pagerUl = $("<ul></ul>").addClass("e-pager");

        container.append(pagerUl);

        $(pagerUl).append(PagerElements.First());
        $(pagerUl).append(PagerElements.Prev());

        for (var i = 1; i <= _getPageCount(rowPerPage, dataCount) ; i++) {
            $(pagerUl).append(PagerElements.Page(i));
        }

        $(pagerUl).children(".page:first").children().children("div").removeClass("page-icon").addClass("page-active-icon");

        $(pagerUl).append(PagerElements.Next());
        $(pagerUl).append(PagerElements.Last());

        return container;
    }

    var _addPage = function (tableObj) {
        
        var lastLi = $("#" + tableObj.Id).find(".page:last");
        var pageNum = Convert.ToNumber($(lastLi).text());

        $(lastLi).after(PagerElements.Page(++pageNum));
    }

    var _removePage = function (tableObj) {
        var lastLi = $("#" + tableObj.Id).find(".page:last");

        if (_getVisiblePageCount(tableObj) > 1)
            lastLi.remove();
    }

    var _refreshPager = function (tableObj) {
        var pc = _getPageCount(tableObj.Options.Pager.RowsPerPage[0], tableObj.FilteredData.Count());
        var pvc = _getVisiblePageCount(tableObj);

        if (pc > pvc) {
            var res = pc - pvc;

            for (var i = 0; i < res; i++) {
                _addPage(tableObj);
            }
        }
        else if (pc < pvc) {
            var res = pvc - pc;

            for (var i = 0; i < res; i++) {
                _removePage(tableObj);
            }
        }
    }

    var _selectPage = function (tableObj, num) {
        var activePage = $("#" + tableObj.Id).find(".page-active-icon");
        var page = $("#" + tableObj.Id).find("a[data-page='" + num + "']");

        if (!$(page).children("div").hasClass("page-active-icon")) {
            $(page).children("div").addClass("page-active-icon");
            $(activePage).removeClass("page-active-icon");
            $(activePage).addClass("page-icon");
        }
    }

    return {
        CreatePager: _createPager,
        AddPage: _addPage,
        RemovePage: _removePage,
        RefreshPager: _refreshPager,
        PerRowPager: _perRowPagerDropDown,
        SelectPage: _selectPage
    }

}(this)

var HeaderHelper = function () {
    var _createSearchCriteria = function (originalColumns) {

        var columns = originalColumns.Where("s=>s.SearchCriteria!==Types.Undefined;");

        var dropDown = $("<select></select>")

        $(dropDown).addClass("t-hs-searchoption");

        var allOption = $("<option value='all' selected='selected'></option>").html(Culture.Default.all);

        $(dropDown).append(allOption);

        columns.ForEach(function (s) {
            var option = $("<option></option>").html(s.Title).attr("value", s.Name);

            $(dropDown).append(option);
        });

        return dropDown;
    }

    var _createTextArea = function () {
        return $("<input type='text' />").addClass("t-hs-txtsearch").attr("data-field", "all");
    }

    var _createSearchBar = function (tableObj) {
        var dropDown = _createSearchCriteria(tableObj.OriginalColumns);
        var textArea = _createTextArea();

        $(dropDown).bind("change", function () {
            var txt = $(this).next(".t-hs-txtsearch");

            var dataField = $(this).val();

            $(txt).attr("data-field", dataField);

            if (txt.val() !== "")
                $(txt).trigger("keyup");
        });

        $(textArea).bind("keyup", function () {
            $(this).trigger("keydown");
        });

        $(textArea).bind("keydown", function () {
            var id = Utils.GetId(this);

            var tObj = objList.First(function (s) { return s.Id == id; });

            var options = tObj.Options;
            var oColumns = tObj.OriginalColumns;

            var criteria = $(this).attr("data-field");
            var searchContent = $(this).val();

            if (searchContent === "") {
                tObj.FilteredData = DataProcess.UsableData(tObj.Id);
            }
            else {
                tObj.FilteredData = DataProcess.Find(tObj.Id, criteria, searchContent);
            }

            PagerHelper.SelectPage(tObj, 1);

            TableHelper.RefreshTable(tObj, tObj.FilteredData);
            PagerHelper.RefreshPager(tObj);
        });

        return Containers.SearchContainer().css("width", "50%").append(dropDown).append(textArea);
    }

    var _createUndoBar = function (tableObj) {
        var undoContainer = Containers.UndoContainer().css("width", "50%");

        var infoSpan = $("<span></span>").addClass("t-hu-info").text("6 Öğe Silindi");

        var undoLink = $("<a href='#'></a>");
        var undoImage = $("<div></div>").addClass("middle-icon").addClass("undo-empty");

        undoLink.append(undoImage);

        undoContainer.append(infoSpan).append(undoLink);

        return undoContainer;
    }

    var _createHeaderBar = function (tableObj) {
        var container = Containers.HeaderContainer();

        var _colWidthSum = tableObj.FullColumns.Sum("s=>s.THWidth");

        if (tableObj.Options.Scrollable) {
            container.css("width", _colWidthSum + 6);
        }
        else {
            container.css("width", _colWidthSum);
        }

        if (tableObj.OriginalColumns.Count("s=>s.searchable!==Types.Undefined") > 0) {
            container.append(_createSearchBar(tableObj));
        }

        if (tableObj.Options.Undo) {
            container.append(_createUndoBar(tableObj));
        }

        return container;
    }

    var _showUndoInfo = function (tableObjId) {

    }

    return {
        CreateHeaderBar: _createHeaderBar
    }

}(this)

var FooterHelper = function () {

    var _createFooter = function (tableObj) {
        var container = Containers.FooterContainer();

        container.append(PagerHelper.CreatePager(tableObj));

        var perRowPager = PagerHelper.PerRowPager(tableObj.Options.Pager.RowsPerPage)

        $(perRowPager).bind("change", function () {
            
            var id = Utils.GetId(this);
            var tObj = objList.First(function (s) { return s.Id == id; });
            tObj.Options.Pager.RowsPerPage[0] = parseInt($(this).val());

            TableHelper.RefreshTable(tObj, tObj.FilteredData);
            PagerHelper.RefreshPager(tObj);
            PagerHelper.SelectPage(tObj, 1);
        });

        container.append(perRowPager);

        return container;
    }

    return {
        CreateFooter: _createFooter
    }

}(this)

var TableHelper = function () {
    var _createColGroup = function (tableObj) {
        var columns = tableObj.FullColumns;

        var colgroup = $("<colgroup></colgroup>");

        columns.ForEach(function (s) {
            if (s.IsVisibleOnTable) {
                $(colgroup).append($("<col />").css("width", s.THWidth));
            }
        });

        return colgroup;
    }

    var _getRowTemplate = function (tableObj) {
        var fullColumns = tableObj.FullColumns;

        var tr = $("<tr></tr>").attr("data-role", "row").attr("data-uid", "");

        fullColumns.ForEach(function (s) {
            if (s.IsVisibleOnTable) {
                var td = $("<td></td>").css("text-align", s.HorizantalAlign).attr("role", "cell").attr("data-field", s.Name);

                $(tr).append(td);
            }
        });

        return $(tr).clone();
    }

    var _getRowInCellByDataField = function (row, dataField) {
        return $(row[0].querySelector("td[data-field='" + dataField + "']"));
    }

    var _createRow = function (obj, tableObj) {
        var fullColumns = tableObj.FullColumns;
        var opt = tableObj.Options;
        var rowTemplate = _getRowTemplate(tableObj);

        fullColumns.ForEach(function (s) {
            if (typeof obj[s.Name] !== Types.Function) {

                $(rowTemplate).attr("data-uid", obj["RowUID"]);

                if (s.IsVisibleOnTable) {
                    var cell = _getRowInCellByDataField(rowTemplate, s.Name);

                    //Entity de olmayan alanlar Selected,Delete vs vs
                    if (typeof obj[s.Name] === Types.Undefined) {
                        $(cell).html(_getCellElementByRole(s.Role));
                    }
                    else if (s.Role == DataRole.Custom) {
                        $(cell).html(_getCellElementCustom(s.ColElement, obj[s.Name]));
                    }
                    else if (s.Role == DataRole.DropDown) {
                        var ds = new DataSource(s.EditOptions.sourceType);
                        var data = ds.GetData(s.EditOptions.source);

                        var value = data.First(function (a) { return a.value === obj[s.Name]; });

                        $(cell).html(_getCellElementByRole(s.Role, value.text));
                    }
                    else {
                        $(cell).html(_getCellElementByRole(s.Role, obj[s.Name]));
                    }
                }
            }
        });

        //Kullanıcının Orjinal Entity e değerleri yüklüyor
        //for (var r in obj) {
        //    if (typeof obj[r] !== Types.Function) {
        //        if (fullColumns.First(String.Format("s=>s.Name=='{0}'", r)).IsVisibleOnTable) {
        //            var cell = _getRowInCellByDataField(rowTemplate, r);

        //            var _role = fullColumns.First(String.Format("s=>s.Name=='{0}'", r)).Role;
        //            if (_role == DataRole.Custom) {
        //                $(cell).html(_getCellElementCustom(String.Format(fullColumns.First(String.Format("s=>s.Name=='{0}'", r)).ColElement, obj[r])));
        //            }
        //            else if (_role == DataRole.DropDown) {

        //            }
        //            else {
        //                $(cell).html(_getCellElementByRole(_role, obj[r]));
        //            }
        //        }
        //    }
        //}

        return rowTemplate;
    }

    var _buildHeader = function (tableObj) {
        var options = tableObj.Options;
        var columns = tableObj.FullColumns;

        var container = Containers.TableHeaderContainer();

        var _colWidthSum = tableObj.FullColumns.Sum("s=>s.THWidth");

        if (tableObj.Options.Scrollable) {
            container.css("width", _colWidthSum + 6);
        }
        else {
            container.css("width", _colWidthSum);
        }

        var table = $("<table></table>");

        var thead = $("<thead></thead>");

        table.append(_createColGroup(tableObj));

        table.append(thead);

        if (options) {
            if (options.AutoGenerateHeader) {

                var tr = $("<tr></tr>");

                columns.ForEach(function (s) {
                    if (s.Type !== Types.Function) {
                        if (s.IsVisibleOnTable) {
                            var td = $("<th></th>").attr("data-field", s.Name).css("text-align", "center");

                            var span = HeaderElement.SpanBox();

                            span.html(s.Title);

                            $(td).append(span);

                            if (s.Sortable) {
                                var sortBox = HeaderElement.SortBox();



                                td.append(sortBox);
                            }

                            $(tr).append(td);
                        }
                    }
                });

                $(thead).append(tr);
            }
        }

        return $(container).append(table);
    }
    var _buildBody = function (tableObj) {

        var bodyContainer = Containers.TableBodyContainer();
        var fullColumns = tableObj.FullColumns;

        var _colWidthSum = tableObj.FullColumns.Sum("s=>s.THWidth");

        if (tableObj.Options.Scrollable) {
            $(tableObj.HTMLTable).css("width", _colWidthSum + 6);
            $(bodyContainer).css("width", _colWidthSum + 6);
            $(bodyContainer).css("overflow-y", "scroll").css("height", tableObj.Options.Scrollable);
        }
        else {
            $(tableObj.HTMLTable).css("width", _colWidthSum);
            $(bodyContainer).css("width", _colWidthSum);
        }


        var table = $("<table></table>");

        var tbody = $("<tbody></tbody>");

        table.append(_createColGroup(tableObj));

        table.append(tbody);

        var useData = DataProcess.UsableData(tableObj.Id);

        tableObj.FilteredData = useData;

        var displayData = DataProcess.DisplayData(1, useData, tableObj.Options);

        tableObj.PagedData = displayData;

        displayData.ForEach(function (s) {
            var tRow = _createRow(s, tableObj);

            tbody.append(tRow);
        });

        return bodyContainer.append(table);
    }
    var _buildFooter = function (tableObj) {
        var options = tableObj.Options;
        var columns = tableObj.FullColumns;

        var container = Containers.TableFooterContainer();

        var table = $("<table></table>");

        var tfoot = $("<tfoot></tfoot>");

        var _colWidthSum = tableObj.FullColumns.Sum("s=>s.THWidth");

        if (tableObj.Options.Scrollable) {
            container.css("width", _colWidthSum + 6);
        }
        else {
            container.css("width", _colWidthSum);
        }

        table.append(_createColGroup(tableObj));

        table.append(tfoot);

        if (options) {
            if (options.Aggregate) {
                var tr = $("<tr></tr>");

                columns.ForEach(function (s) {
                    if (s.Type !== Types.Function) {
                        if (s.IsVisibleOnTable) {
                            var td = $("<td></td>").attr("data-field", s.Name).css("text-align", "center");

                            var span = HeaderElement.SpanBox();

                            if (tableObj.Aggregate.Any(String.Format("s=>s.fieldName=='{0}'", s.Name))) {
                                var _aggregate = tableObj.Aggregate.First(String.Format("s=>s.fieldName=='{0}'", s.Name)).aggregate;

                                if (_aggregate === Aggregate.Sum) {
                                    var sum = tableObj.FilteredData.Sum(String.Format("s=>s.{0}", s.Name));

                                    span.text(sum);
                                }
                                else if (_aggregate === Aggregate.Avarage) {
                                    var sum = tableObj.FilteredData.Sum(String.Format("s=>s.{0}", s.Name));
                                    var count = tableObj.FilteredData.Count(String.Format("s=>s.{0}", s.Name));

                                    var result = count / sum;

                                    span.text(result);
                                }
                                else if (_aggregate === Aggregate.Count) {
                                    var count = tableObj.FilteredData.Count();

                                    span.text(count);
                                }

                                $(td).append(span);
                            }

                            $(tr).append(td);
                        }
                    }
                });

                $(tfoot).append(tr);
            }
        }

        return $(container).append(table);
    }

    var _dedectDataRole = function (value) {
        var _dataRole = {};

        var type = typeof value;

        switch (type) {
            case Types.Boolean:
                _dataRole = DataRole.TrueFalse;
                break;
            case Types.Number:
                _dataRole = DataRole.Numeric;
                break;
            case Types.String:
                if (value.Contains(".jpg") || value.Contains(".png") || value.Contains(".gif")) {
                    _dataRole = DataRole.Image;
                }
                else if (value.Contains("http://")) {
                    _dataRole = DataRole.Link;
                }
                else {

                    var mtc1 = value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
                    var mtc2 = value.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/);
                    var mtc3 = value.match(/^\d{1,2}\-\d{1,2}\-\d{4}$/);

                    if (mtc1 != null || mtc2 != null || mtc3 != null)
                        _dataRole = DataRole.DateTime;
                    else
                        _dataRole = DataRole.Text;
                }
                break;
            default:
                _dataRole = DataRole.Text;

        }

        return _dataRole;
    }
    var _getEditElement = function (dataRole) {
        switch (dataRole) {
            case DataRole.Currency:
                return EditElement.CurrencyBox();
            case DataRole.Date:
                return EditElement.DateBox();
            case DataRole.DateTime:
                return EditElement.DateTimeBox();
            case DataRole.Image:
                return EditElement.ImageBox();
            case DataRole.Link:
                return EditElement.LinkBox();
            case DataRole.Numeric:
                return EditElement.NumericBox();
            case DataRole.Text:
                return EditElement.TextBox();
            case DataRole.Time:
                return EditElement.TimeBox();
            case DataRole.TrueFalse:
                return EditElement.CheckBox();
            case DataRole.DropDown:
                return EditElement.DropDown();
            default:
                return EditElement.TextBox();
        }
    }
    var _getCellElementCustom = function (element) {
        return CellElement.CustomElement(element);
    }
    var _getCellElementByRole = function (role, value) {
        switch (role) {
            case DataRole.Currency:
            case DataRole.Date:
            case DataRole.DateTime:
            case DataRole.DropDown:
            case DataRole.Numeric:
            case DataRole.Text:
            case DataRole.Time:
                return CellElement.Span(value);
            case DataRole.Link:
                return CellElement.Link(value);
            case DataRole.Image:
                return CellElement.Image(value);
            case DataRole.TrueFalse:
                return CellElement.CheckBox(value);
            case DataRole.Delete:
                return CellElement.DeleteElement();
        }
    }

    var _refreshTable = function (tableObj, datas) {
        var body = Utils.GetBody(tableObj.Id);

        $(body).find("tr").remove();

        var datas = DataProcess.DisplayData(1, datas, tableObj.Options);

        datas.ForEach(function (s) {
            var tr = _createRow(s, tableObj);

            $(body).append(tr);
        });
    }

    var _createTable = function (tableObj) {
        var tHeader = _buildHeader(tableObj);
        var tBody = _buildBody(tableObj);
        var tFooter = _buildFooter(tableObj);

        var container = Containers.TableContainer();

        return $(container).append(tHeader).append(tBody).append(tFooter);
    }

    var _getEditElementValueByRole = function (editElement, role) {
        switch (role) {
            case DataRole.Currency:
            case DataRole.Date:
            case DataRole.DateTime:
            case DataRole.Numeric:
            case DataRole.Text:
            case DataRole.Time:
            case DataRole.Link:
            case DataRole.Image:
                return { text: $(editElement).val(), value: $(editElement).val() };
            case DataRole.DropDown:
                return { text: $(editElement).children(':selected').text(), value: $(editElement).val() }
            case DataRole.TrueFalse:
                return { text: $(editElement).is(":checked"), value: $(editElement).is(":checked") };
        }
    }
    var _getCellValueByRole = function (cell, role) {
        switch (role) {
            case DataRole.Currency:
            case DataRole.Date:
            case DataRole.DateTime:
            case DataRole.DropDown:
            case DataRole.Numeric:
            case DataRole.Text:
            case DataRole.Time:
                return $(cell).children("span").text().trim();
            case DataRole.Link:
                return $(cell).children("a").attr("href");
            case DataRole.Image:
                return $(cell).children("img").attr("src");
            case DataRole.TrueFalse:
                return $(cell).children("input[type='checkbox']").is(":checked");
        }
    }
    var _getEditElementByRole = function (value, role, options) {
        switch (role) {
            case DataRole.Currency:
                return EditElement.CurrencyBox(value);
            case DataRole.Date:
                return EditElement.DateBox(value);
            case DataRole.DateTime:
                return EditElement.DateTimeBox(value);
            case DataRole.DropDown:
                return EditElement.DropDown();
            case DataRole.Numeric:
                return EditElement.NumericBox(value);
            case DataRole.Text:
                return EditElement.TextBox(value);
            case DataRole.Time:
                return EditElement.TimeBox(value);
            case DataRole.Link:
                return EditElement.LinkBox(value);
            case DataRole.Image:
                return EditElement.ImageBox(value);
            case DataRole.TrueFalse:
                return EditElement.CheckBox(value);
        }
    }

    var _getDropDownOptions = function (id, sValue, fieldName) {
        var tObj = objList.First(function (s) { return s.Id === id; });
        var column = tObj.FullColumns.First(function (s) { return s.Name === fieldName; });

        var ds = new DataSource(column.EditOptions.sourceType);
        var data = ds.GetData(column.EditOptions.source);

        var select = $("<select></select>");

        data.ForEach(function (s) {
            var option = $("<option></option>");

            if (s.text === sValue) {
                $(option).val(s.value).text(s.text).attr("selected", "selected");
            }
            else {
                $(option).val(s.value).text(s.text);
            }

            $(select).append(option);
        });

        return select;
    }

    var _getRowByCell = function (cell) {
        return $(cell).parents("tr");
    }

    var _getRowUidByCell = function (cell) {
        return $(cell).parents("tr").attr("data-uid");
    }

    var _updateCell = function (editElement) {
        var rowId = _getRowUidByCell(editElement);
        var dataField = $(editElement).parent().attr("data-field");
        var id = Utils.GetId(editElement);
        var tObj = objList.First(function (s) { return s.Id === id; });
        var col = tObj.OriginalColumns.First(function (s) { return s.Name === dataField; });

        var text = _getEditElementValueByRole(editElement, col.Role).text;
        var updatedCell = _getCellElementByRole(col.Role, text);
        
        $(editElement).parent().append(updatedCell);
        $(editElement).remove();
    }

    return {
        BuildHeader: _buildHeader,
        BuildBody: _buildBody,
        BuildFooter: _buildFooter,
        CreateTable: _createTable,
        GetEditElement: _getEditElement,
        CreateCellElementByRole: _getCellElementByRole,
        CreateCustomCellElement: _getCellElementCustom,
        RowTemplate: _getRowTemplate,
        DedectDataRole: _dedectDataRole,
        RefreshTable: _refreshTable,
        EditElement: _getEditElementByRole,
        GetCellValue: _getCellValueByRole,
        GetDropDownOptions: _getDropDownOptions,
        GetRowByCell: _getRowByCell,
        GetRowUIDByCell: _getRowUidByCell,
        GetCellElementByRole: _getCellElementByRole,
        GetEditElementValueByRole: _getEditElementValueByRole,
        UpdateCell: _updateCell
    }
}(this)

var EventFire = function () {

    var _cellEditing = function (options, eventArgs) {
        if (options.CellEditing) {
            options.CellEditing(eventArgs);
        }
    }

    var _cellEdited = function (options, eventArgs) {
        if (options.CellEdited) {
            options.CellEdited(eventArgs);
        }
    }

    var _rowDeleting = function (options, eventArgs) {
        if (options.RowDeleting) {
            options.RowDeleting(eventArgs);
        }
    }

    var _rowDeleted = function (options, eventArgs) {
        if (options.RowDeleted) {
            options.RowDeleted(eventArgs);
        }
    }

    var _rowAdded = function (options, eventArgs) {
        if (options.RowAdded) {
            options.RowAdded(eventArgs);
        }
    }

    var _pageChanged = function (options, eventArgs) {
        if (options.Pager.PageChanged) {
            options.Pager.PageChanged(eventArgs);
        }
    }

    return {
        CellEditing: _cellEditing,
        CellEdited: _cellEdited,
        RowDeleting: _rowDeleting,
        RowDeleted: _rowDeleted,
        RowAdded: _rowAdded,
        PageChanged: _pageChanged
    }
}(this)

var EventHelper = function () {
    var _batchEditing = function () {
        $('.t-b-container').delegate('td', 'click', function () {
            var id = Utils.GetId(this);
            var tableObj = objList.First(function (s) { return s.Id === id });
            var field = $(this).attr("data-field");
            var col = tableObj.OriginalColumns.First(function (s) { return s.Name === field; });
            var role = col.Role;

            if (col.Edit && $(this).children("*[class^='edit']").length == 0) {
                $("*[class^='edit']").remove();

                var value = TableHelper.GetCellValue(this, role);
                var cellElement = TableHelper.EditElement(value, role);
                $(cellElement).css("width", col.THWidth - 15);

                if (role == DataRole.DropDown) {
                    var select = TableHelper.GetDropDownOptions(id, value, col.Name);

                    $(cellElement).append(select.children());
                }

                $(cellElement).bind("blur", function () {
                    var isOk = DataProcess.UpdateDataByEditElement(this);

                    if (isOk)
                        TableHelper.UpdateCell(this);
                });

                $(this).children().remove();
                $(this).append(cellElement);
                cellElement.focus();
            }
        });
    }

    var _createEditEvents = function (opt) {
        switch (opt.Edit) {
            case EditType.Batch:
                _batchEditing();
                break;
            case EditType.Row:
                break;
            case EditType.PopUp:
                break;
            default:

        }
    }

    var _createPageEvents = function () {
        $(".e-pg-container").delegate("a", "click", function () {
            var id = Utils.GetId(this);

            var tObj = objList.First(function (s) { return s.Id == id; });

            var pageNum = parseInt($(this).attr("data-page"));

            tObj.PagedData = DataProcess.DisplayData(pageNum, tObj.FilteredData, tObj.Options);

            TableHelper.RefreshTable(tObj, tObj.PagedData);

            PagerHelper.SelectPage(tObj, pageNum);

            return false;
        });
    }

    var _createSortEvents = function () {
        $(".t-h-container").delegate("a[data-role='sort']", "click", function () {
            var id = Utils.GetId(this);
            var a = $(this);
            var td = $(this).parent("th");
            var dataField = td.attr("data-field");
            var sortDirection = a.attr("sort-direction");

            var tObj = objList.First(function (s) { return s.Id == id; });

            tObj.FilteredData.Sort(String.Format("s=>s.{0}", dataField), sortDirection);

            TableHelper.RefreshTable(tObj, tObj.FilteredData);
            PagerHelper.SelectPage(tObj, 1);
        });
    }

    return {
        CreateEditEvents: _createEditEvents,
        CreatePageEvents: _createPageEvents,
        CreateSortEvents: _createSortEvents
    }
}(this)

var EntityHelper = function () {
    var _addUndoField = function (entity) {
        entity.UndoStatus = UndoStatus.Visible;
    }

    var _addRowVersion = function (entity) {
        entity.RowVersion = RowVersion.UnChanged;
    }

    var _addSelected = function (entity) {
        entity.Selected = false;
    }

    var _addRowGuid = function (entity) {
        entity.RowUID = Utils.UniqueId();
    }

    var _addFields = function (datas, options) {
        datas.ForEach(function (s) {
            if (options.Undo)
                _addUndoField(s);

            if (options.RowVersion)
                _addRowVersion(s);

            if (options.SelectBox)
                _addSelected(s);

            _addRowGuid(s);
        });
    }

    return {
        AddFields: _addFields
    }
}(this)

var TableObject = function (id, data, htmlTable, options, originalColumns, fullColumns, aggregate) {
    this.Id = id;
    this.Data = data;
    this.HTMLTable = htmlTable;
    this.Options = options;
    this.OriginalColumns = originalColumns;
    this.FullColumns = fullColumns;
    this.Aggregate = aggregate;
    this.FilteredData = Types.Undefined;
    this.PagedData = Types.Undefined;

    if (typeof options.Edit === Types.Undefined) {
        this.Options.Edit = EditType.Batch;
    }
}

var Column = function (title, name, type, edit, sortable, searchCriteria, validate, role, width, colElement, align, isVisibleOnTable, editOptions) {
    this.Title = title;
    this.Name = name;
    this.Type = type;
    this.Edit = edit;
    this.Sortable = sortable;
    this.SearchCriteria = searchCriteria;
    this.Validate = validate;
    this.Role = role;
    this.THWidth = typeof width === Types.Undefined ? 100 : width;
    this.ColElement = colElement;
    this.HorizantalAlign = typeof align === Types.Undefined ? Align.Left : align;
    this.IsVisibleOnTable = typeof isVisibleOnTable === Types.Undefined || isVisibleOnTable === true ? true : false;
    this.EditOptions = editOptions;

    if (role == DataRole.DropDown && typeof editOptions == Types.Undefined)
        throw Error("if Role is DropDown editOptions Required");

    this.RowVersion = RowVersion.UnChanged;
    this.UndoStatus = UndoStatus.Visible;
    this.Selected = false;
    this.RowUID = Utils.UniqueId();
}

var CellEditingEventArgs = function () {
    this.Cancel = false;
    this.NewValue = {};
    this.OldValue = {};
    this.Column = {};
}

var CellEditedEventArgs = function () {
    this.NewValue = {};
    this.OldValue = {};
    this.Column = {};
}

var RowDeletedEventArgs = function () {
    this.DeletedRow = {};
}

var RowDeletingEventArgs = function () {
    this.Row = {};
    this.Cancel = false;
}

var RowAddedEventArgs = function () {
    this.Row = {};
}

var PageChangedEventArgs = function () {
    this.PrevPage = {};
    this.NextPage = {};
    this.CurrentPage = {};
    this.DataCount = {};
}
$(function () {
    var _originalColumns = function (tableobj) {

        var opt = tableobj.Options;
        var data = tableobj.Data;

        var colList = new List();

        if (opt.Columns) {
            for (var i = 0; i < opt.Columns.length; i++) {
                var _tmpCol = opt.Columns[i];

                var col = new Column(_tmpCol.title,
                                     _tmpCol.name,
                                     _tmpCol.type,
                                     _tmpCol.edit,
                                     _tmpCol.sortable,
                                     typeof _tmpCol.searchable != Types.Undefined ? _tmpCol.searchable.criteria : Types.Undefined,
                                     typeof _tmpCol.validate !== Types.Undefined,
                                     typeof _tmpCol.role == Types.Undefined ? TableHelper.DedectDataRole(data.ToArray()[0][_tmpCol.name]) : _tmpCol.role,
                                     _tmpCol.width,
                                     _tmpCol.colElement,
                                     _tmpCol.align,
                                     _tmpCol.isVisibleOnTable,
                                     _tmpCol.editOptions);

                if (col.Type !== Types.Function)
                    colList.Add(col);
            }
        }
        else {
            if (data.Count() < 1) throw Error("Kolonların ve tiplerin otomatik oluşturulabilmesi için veri gereklidir");

            for (var colm in data.ToArray()[0]) {

                var col = new Column(colm.toString(),
                                     colm.toString(),
                                     typeof data.ToArray()[0][colm],
                                     opt.Editable,
                                     true,
                                     SearchCriteria.Contains,
                                     false,
                                     TableHelper.DedectDataRole(data.ToArray()[0][colm]),
                                     100,
                                     Types.Undefined,
                                     Types.Undefined,
                                     true,
                                     Types.Undefined);

                if (col.Type !== Types.Function)
                    colList.Add(col);
            }
        }

        return colList;
    }

    var _fullColumns = function (tableobj) {

        var opt = tableobj.Options;
        var data = tableobj.Data;

        var colList = new List();

        if (opt.SelectBox) {
            colList.Add(new Column(HeaderElement.SelectBox(), "Selected", Types.Undefined, true, false, false, false, DataRole.TrueFalse, 30, HeaderElement.SelectBox(), Align.Center, true));
        }

        if (opt.Columns) {
            for (var i = 0; i < opt.Columns.length; i++) {
                var _tmpCol = opt.Columns[i];

                if (typeof _tmpCol.name === Types.Undefined)
                    throw Error("Name is Required!");

                var col = new Column(typeof _tmpCol.title == Types.Undefined ? "" : _tmpCol.title,
                                     _tmpCol.name,
                                     typeof _tmpCol.type == Types.Undefined ? typeof data.ToArray()[0][_tmpCol.name] : _tmpCol.type,
                                     typeof _tmpCol.edit === Types.Undefined || _tmpCol.edit === true,
                                     _tmpCol.sortable,
                                     typeof _tmpCol.searchable != Types.Undefined ? _tmpCol.searchable.criteria : Types.Undefined,
                                     typeof _tmpCol.validate !== Types.Undefined,
                                     typeof _tmpCol.role == Types.Undefined ? TableHelper.DedectDataRole(data.ToArray()[0][_tmpCol.name]) : _tmpCol.role,
                                     _tmpCol.width,
                                     _tmpCol.colElement,
                                     _tmpCol.align,
                                     _tmpCol.isVisibleOnTable,
                                     _tmpCol.editOptions);

                if (col.Type !== Types.Function)
                    colList.Add(col);
            }
        }
        else {
            if (data.Count() < 1) throw Error("Kolonların ve tiplerin otomatik oluşturulabilmesi için veri gereklidir");

            for (var colm in data.ToArray()[0]) {
                var col = new Column(colm.toString(),
                                     colm.toString(),
                                     typeof data.ToArray()[0][colm],
                                     opt.Editable,
                                     true,
                                     SearchCriteria.Contains,
                                     false,
                                     TableHelper.DedectDataRole(colm),
                                     100,
                                     Types.Undefined,
                                     Align.Left,
                                     true,
                                     Types.Undefined);

                if (col.Type !== Types.Function)
                    colList.Add(col);
            }
        }

        if (opt.DeleteBox) {
            colList.Add(new Column(HeaderElement.DeleteBox(), "deletebox", Types.String, false, false, false, false, DataRole.Delete, 30, HeaderElement.DeleteBox(), Align.Center, true, Types.Undefined));
        }

        if (opt.RowVersion) {
            colList.Add(new Column("", "RowVersion", Types.Number, false, false, false, false, DataRole.Numeric, 0, Types.Undefined, Types.Undefined, false, Types.Undefined));
        }

        if (opt.Undo) {
            colList.Add(new Column("", "UndoStatus", Types.Number, false, false, false, false, DataRole.Numeric, 0, Types.Undefined, Types.Undefined, false, Types.Undefined));
        }

        colList.Add(new Column("", "RowUID", Types.String, false, false, false, false, DataRole.Text, 0, Types.Undefined, Types.Undefined, false, Types.Undefined));

        return colList;
    }

    var _createTableObject = function (options, table) {
        var dataSource = {};
        if (typeof options !== Types.Undefined) {
            if (typeof options.DataSource !== Types.Undefined) {
                var ds = new DataSource(options.DataSource.sourceType);

                dataSource = ds.GetData(options.DataSource.source);
            }
            else
                dataSource = new List();
        }
        else
            dataSource = new List();

        //AddCustomFieldsToEntity
        EntityHelper.AddFields(dataSource, options);

        var tableGuid = Utils.EGuid();

        if (typeof $(table).attr("id") === Types.Undefined || $(table).attr("id") === "") {
            $(table).attr("id", tableGuid);
        }
        else {
            tableGuid = $(table).attr("id");
        }

        var tableObj = new TableObject(tableGuid, dataSource, $(table), options, Types.Undefined, Types.Undefined, new List(options.Aggregate));

        tableObj.FullColumns = _fullColumns(tableObj);
        tableObj.OriginalColumns = _originalColumns(tableObj);

        return tableObj;
    }

    $.fn.JazzTable = function (opt) {
        $(this).each(function (index) {
            $(this).addClass("e-datatable-container");

            var tableObj = _createTableObject(opt.Extend(), $(this));

            objList.Add(tableObj);

            //$(this).append("<div class='clearfix'></div>");
            //$(this).append("<div>Batch Edit</div>");
            $(this).append(HeaderHelper.CreateHeaderBar(tableObj));
            $(this).append("<div class='clearfix'></div>");
            $(this).append(TableHelper.CreateTable(tableObj));
            $(this).append("<div class='clearfix'></div>");
            $(this).append(FooterHelper.CreateFooter(tableObj));
            $(this).append("<div class='clearfix'></div>");
        });

        EventHelper.CreateEditEvents(opt);
        EventHelper.CreatePageEvents();
        EventHelper.CreateSortEvents();
    }
})
