// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_refunds_by_trip200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsRefundsByTrip200Response
    extends PaymentsRefundsByTrip200Response {
  @override
  final BuiltList<PaymentsRefundsByTrip200ResponseItemsInner>? items;

  factory _$PaymentsRefundsByTrip200Response(
          [void Function(PaymentsRefundsByTrip200ResponseBuilder)? updates]) =>
      (PaymentsRefundsByTrip200ResponseBuilder()..update(updates))._build();

  _$PaymentsRefundsByTrip200Response._({this.items}) : super._();
  @override
  PaymentsRefundsByTrip200Response rebuild(
          void Function(PaymentsRefundsByTrip200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsRefundsByTrip200ResponseBuilder toBuilder() =>
      PaymentsRefundsByTrip200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsRefundsByTrip200Response && items == other.items;
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
    return (newBuiltValueToStringHelper(r'PaymentsRefundsByTrip200Response')
          ..add('items', items))
        .toString();
  }
}

class PaymentsRefundsByTrip200ResponseBuilder
    implements
        Builder<PaymentsRefundsByTrip200Response,
            PaymentsRefundsByTrip200ResponseBuilder> {
  _$PaymentsRefundsByTrip200Response? _$v;

  ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner>? _items;
  ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner> get items =>
      _$this._items ??=
          ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner>();
  set items(ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner>? items) =>
      _$this._items = items;

  PaymentsRefundsByTrip200ResponseBuilder() {
    PaymentsRefundsByTrip200Response._defaults(this);
  }

  PaymentsRefundsByTrip200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsRefundsByTrip200Response other) {
    _$v = other as _$PaymentsRefundsByTrip200Response;
  }

  @override
  void update(void Function(PaymentsRefundsByTrip200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsRefundsByTrip200Response build() => _build();

  _$PaymentsRefundsByTrip200Response _build() {
    _$PaymentsRefundsByTrip200Response _$result;
    try {
      _$result = _$v ??
          _$PaymentsRefundsByTrip200Response._(
            items: _items?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'items';
        _items?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'PaymentsRefundsByTrip200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
