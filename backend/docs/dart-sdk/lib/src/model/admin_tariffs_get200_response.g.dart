// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_tariffs_get200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminTariffsGet200Response extends AdminTariffsGet200Response {
  @override
  final BuiltList<AdminTariffsGet200ResponseItemsInner>? items;

  factory _$AdminTariffsGet200Response(
          [void Function(AdminTariffsGet200ResponseBuilder)? updates]) =>
      (AdminTariffsGet200ResponseBuilder()..update(updates))._build();

  _$AdminTariffsGet200Response._({this.items}) : super._();
  @override
  AdminTariffsGet200Response rebuild(
          void Function(AdminTariffsGet200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminTariffsGet200ResponseBuilder toBuilder() =>
      AdminTariffsGet200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminTariffsGet200Response && items == other.items;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, items.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AdminTariffsGet200Response')
          ..add('items', items))
        .toString();
  }
}

class AdminTariffsGet200ResponseBuilder
    implements
        Builder<AdminTariffsGet200Response, AdminTariffsGet200ResponseBuilder> {
  _$AdminTariffsGet200Response? _$v;

  ListBuilder<AdminTariffsGet200ResponseItemsInner>? _items;
  ListBuilder<AdminTariffsGet200ResponseItemsInner> get items =>
      _$this._items ??= ListBuilder<AdminTariffsGet200ResponseItemsInner>();
  set items(ListBuilder<AdminTariffsGet200ResponseItemsInner>? items) =>
      _$this._items = items;

  AdminTariffsGet200ResponseBuilder() {
    AdminTariffsGet200Response._defaults(this);
  }

  AdminTariffsGet200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminTariffsGet200Response other) {
    _$v = other as _$AdminTariffsGet200Response;
  }

  @override
  void update(void Function(AdminTariffsGet200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminTariffsGet200Response build() => _build();

  _$AdminTariffsGet200Response _build() {
    _$AdminTariffsGet200Response _$result;
    try {
      _$result = _$v ??
          _$AdminTariffsGet200Response._(
            items: _items?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'items';
        _items?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'AdminTariffsGet200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
