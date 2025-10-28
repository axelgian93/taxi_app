// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_refunds_get200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminRefundsGet200Response extends AdminRefundsGet200Response {
  @override
  final BuiltList<PaymentsTripIdRefundsGet200ResponseItemsInner>? items;
  @override
  final String? nextCursor;

  factory _$AdminRefundsGet200Response(
          [void Function(AdminRefundsGet200ResponseBuilder)? updates]) =>
      (AdminRefundsGet200ResponseBuilder()..update(updates))._build();

  _$AdminRefundsGet200Response._({this.items, this.nextCursor}) : super._();
  @override
  AdminRefundsGet200Response rebuild(
          void Function(AdminRefundsGet200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminRefundsGet200ResponseBuilder toBuilder() =>
      AdminRefundsGet200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminRefundsGet200Response &&
        items == other.items &&
        nextCursor == other.nextCursor;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, items.hashCode);
    _$hash = $jc(_$hash, nextCursor.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AdminRefundsGet200Response')
          ..add('items', items)
          ..add('nextCursor', nextCursor))
        .toString();
  }
}

class AdminRefundsGet200ResponseBuilder
    implements
        Builder<AdminRefundsGet200Response, AdminRefundsGet200ResponseBuilder> {
  _$AdminRefundsGet200Response? _$v;

  ListBuilder<PaymentsTripIdRefundsGet200ResponseItemsInner>? _items;
  ListBuilder<PaymentsTripIdRefundsGet200ResponseItemsInner> get items =>
      _$this._items ??=
          ListBuilder<PaymentsTripIdRefundsGet200ResponseItemsInner>();
  set items(
          ListBuilder<PaymentsTripIdRefundsGet200ResponseItemsInner>? items) =>
      _$this._items = items;

  String? _nextCursor;
  String? get nextCursor => _$this._nextCursor;
  set nextCursor(String? nextCursor) => _$this._nextCursor = nextCursor;

  AdminRefundsGet200ResponseBuilder() {
    AdminRefundsGet200Response._defaults(this);
  }

  AdminRefundsGet200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _nextCursor = $v.nextCursor;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminRefundsGet200Response other) {
    _$v = other as _$AdminRefundsGet200Response;
  }

  @override
  void update(void Function(AdminRefundsGet200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminRefundsGet200Response build() => _build();

  _$AdminRefundsGet200Response _build() {
    _$AdminRefundsGet200Response _$result;
    try {
      _$result = _$v ??
          _$AdminRefundsGet200Response._(
            items: _items?.build(),
            nextCursor: nextCursor,
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'items';
        _items?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'AdminRefundsGet200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
