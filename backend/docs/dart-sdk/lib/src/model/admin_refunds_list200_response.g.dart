// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_refunds_list200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminRefundsList200Response extends AdminRefundsList200Response {
  @override
  final BuiltList<PaymentsRefundsByTrip200ResponseItemsInner>? items;
  @override
  final String? nextCursor;

  factory _$AdminRefundsList200Response(
          [void Function(AdminRefundsList200ResponseBuilder)? updates]) =>
      (AdminRefundsList200ResponseBuilder()..update(updates))._build();

  _$AdminRefundsList200Response._({this.items, this.nextCursor}) : super._();
  @override
  AdminRefundsList200Response rebuild(
          void Function(AdminRefundsList200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminRefundsList200ResponseBuilder toBuilder() =>
      AdminRefundsList200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminRefundsList200Response &&
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
    return (newBuiltValueToStringHelper(r'AdminRefundsList200Response')
          ..add('items', items)
          ..add('nextCursor', nextCursor))
        .toString();
  }
}

class AdminRefundsList200ResponseBuilder
    implements
        Builder<AdminRefundsList200Response,
            AdminRefundsList200ResponseBuilder> {
  _$AdminRefundsList200Response? _$v;

  ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner>? _items;
  ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner> get items =>
      _$this._items ??=
          ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner>();
  set items(ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner>? items) =>
      _$this._items = items;

  String? _nextCursor;
  String? get nextCursor => _$this._nextCursor;
  set nextCursor(String? nextCursor) => _$this._nextCursor = nextCursor;

  AdminRefundsList200ResponseBuilder() {
    AdminRefundsList200Response._defaults(this);
  }

  AdminRefundsList200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _nextCursor = $v.nextCursor;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminRefundsList200Response other) {
    _$v = other as _$AdminRefundsList200Response;
  }

  @override
  void update(void Function(AdminRefundsList200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminRefundsList200Response build() => _build();

  _$AdminRefundsList200Response _build() {
    _$AdminRefundsList200Response _$result;
    try {
      _$result = _$v ??
          _$AdminRefundsList200Response._(
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
            r'AdminRefundsList200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
