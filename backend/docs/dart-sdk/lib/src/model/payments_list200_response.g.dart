// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_list200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsList200Response extends PaymentsList200Response {
  @override
  final BuiltList<PaymentsList200ResponseItemsInner>? items;
  @override
  final String? nextCursor;

  factory _$PaymentsList200Response(
          [void Function(PaymentsList200ResponseBuilder)? updates]) =>
      (PaymentsList200ResponseBuilder()..update(updates))._build();

  _$PaymentsList200Response._({this.items, this.nextCursor}) : super._();
  @override
  PaymentsList200Response rebuild(
          void Function(PaymentsList200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsList200ResponseBuilder toBuilder() =>
      PaymentsList200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsList200Response &&
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
    return (newBuiltValueToStringHelper(r'PaymentsList200Response')
          ..add('items', items)
          ..add('nextCursor', nextCursor))
        .toString();
  }
}

class PaymentsList200ResponseBuilder
    implements
        Builder<PaymentsList200Response, PaymentsList200ResponseBuilder> {
  _$PaymentsList200Response? _$v;

  ListBuilder<PaymentsList200ResponseItemsInner>? _items;
  ListBuilder<PaymentsList200ResponseItemsInner> get items =>
      _$this._items ??= ListBuilder<PaymentsList200ResponseItemsInner>();
  set items(ListBuilder<PaymentsList200ResponseItemsInner>? items) =>
      _$this._items = items;

  String? _nextCursor;
  String? get nextCursor => _$this._nextCursor;
  set nextCursor(String? nextCursor) => _$this._nextCursor = nextCursor;

  PaymentsList200ResponseBuilder() {
    PaymentsList200Response._defaults(this);
  }

  PaymentsList200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _nextCursor = $v.nextCursor;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsList200Response other) {
    _$v = other as _$PaymentsList200Response;
  }

  @override
  void update(void Function(PaymentsList200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsList200Response build() => _build();

  _$PaymentsList200Response _build() {
    _$PaymentsList200Response _$result;
    try {
      _$result = _$v ??
          _$PaymentsList200Response._(
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
            r'PaymentsList200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
