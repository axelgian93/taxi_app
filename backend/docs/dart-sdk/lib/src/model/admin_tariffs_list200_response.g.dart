// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_tariffs_list200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminTariffsList200Response extends AdminTariffsList200Response {
  @override
  final BuiltList<AdminTariffsList200ResponseItemsInner>? items;

  factory _$AdminTariffsList200Response(
          [void Function(AdminTariffsList200ResponseBuilder)? updates]) =>
      (AdminTariffsList200ResponseBuilder()..update(updates))._build();

  _$AdminTariffsList200Response._({this.items}) : super._();
  @override
  AdminTariffsList200Response rebuild(
          void Function(AdminTariffsList200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminTariffsList200ResponseBuilder toBuilder() =>
      AdminTariffsList200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminTariffsList200Response && items == other.items;
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
    return (newBuiltValueToStringHelper(r'AdminTariffsList200Response')
          ..add('items', items))
        .toString();
  }
}

class AdminTariffsList200ResponseBuilder
    implements
        Builder<AdminTariffsList200Response,
            AdminTariffsList200ResponseBuilder> {
  _$AdminTariffsList200Response? _$v;

  ListBuilder<AdminTariffsList200ResponseItemsInner>? _items;
  ListBuilder<AdminTariffsList200ResponseItemsInner> get items =>
      _$this._items ??= ListBuilder<AdminTariffsList200ResponseItemsInner>();
  set items(ListBuilder<AdminTariffsList200ResponseItemsInner>? items) =>
      _$this._items = items;

  AdminTariffsList200ResponseBuilder() {
    AdminTariffsList200Response._defaults(this);
  }

  AdminTariffsList200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminTariffsList200Response other) {
    _$v = other as _$AdminTariffsList200Response;
  }

  @override
  void update(void Function(AdminTariffsList200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminTariffsList200Response build() => _build();

  _$AdminTariffsList200Response _build() {
    _$AdminTariffsList200Response _$result;
    try {
      _$result = _$v ??
          _$AdminTariffsList200Response._(
            items: _items?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'items';
        _items?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'AdminTariffsList200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
