// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_trip_id_refunds_get200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsTripIdRefundsGet200Response
    extends PaymentsTripIdRefundsGet200Response {
  @override
  final BuiltList<PaymentsTripIdRefundsGet200ResponseItemsInner>? items;

  factory _$PaymentsTripIdRefundsGet200Response(
          [void Function(PaymentsTripIdRefundsGet200ResponseBuilder)?
              updates]) =>
      (PaymentsTripIdRefundsGet200ResponseBuilder()..update(updates))._build();

  _$PaymentsTripIdRefundsGet200Response._({this.items}) : super._();
  @override
  PaymentsTripIdRefundsGet200Response rebuild(
          void Function(PaymentsTripIdRefundsGet200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsTripIdRefundsGet200ResponseBuilder toBuilder() =>
      PaymentsTripIdRefundsGet200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsTripIdRefundsGet200Response && items == other.items;
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
    return (newBuiltValueToStringHelper(r'PaymentsTripIdRefundsGet200Response')
          ..add('items', items))
        .toString();
  }
}

class PaymentsTripIdRefundsGet200ResponseBuilder
    implements
        Builder<PaymentsTripIdRefundsGet200Response,
            PaymentsTripIdRefundsGet200ResponseBuilder> {
  _$PaymentsTripIdRefundsGet200Response? _$v;

  ListBuilder<PaymentsTripIdRefundsGet200ResponseItemsInner>? _items;
  ListBuilder<PaymentsTripIdRefundsGet200ResponseItemsInner> get items =>
      _$this._items ??=
          ListBuilder<PaymentsTripIdRefundsGet200ResponseItemsInner>();
  set items(
          ListBuilder<PaymentsTripIdRefundsGet200ResponseItemsInner>? items) =>
      _$this._items = items;

  PaymentsTripIdRefundsGet200ResponseBuilder() {
    PaymentsTripIdRefundsGet200Response._defaults(this);
  }

  PaymentsTripIdRefundsGet200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsTripIdRefundsGet200Response other) {
    _$v = other as _$PaymentsTripIdRefundsGet200Response;
  }

  @override
  void update(
      void Function(PaymentsTripIdRefundsGet200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsTripIdRefundsGet200Response build() => _build();

  _$PaymentsTripIdRefundsGet200Response _build() {
    _$PaymentsTripIdRefundsGet200Response _$result;
    try {
      _$result = _$v ??
          _$PaymentsTripIdRefundsGet200Response._(
            items: _items?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'items';
        _items?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(r'PaymentsTripIdRefundsGet200Response',
            _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
